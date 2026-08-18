import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

// Telegram Bot Webhook - Admin + Seller panel
export async function POST(req: NextRequest){
  try {
    const body = await req.json()
    const message = body.message
    const callback = body.callback_query
    if(!message && !callback) return NextResponse.json({ok:true})

    const ADMIN_ID = process.env.TELEGRAM_ADMIN_ID
    const chatId = message?.chat?.id || callback?.message?.chat?.id
    const text = message?.text || ''
    const firstName = message?.from?.first_name || 'Do\'st'

    // /start command - MAIN
    if(text === '/start'){
      if(String(chatId) === String(ADMIN_ID)){
        const msg = `👋 Salom Admin ${firstName}!

🏆 *WebInvite v2 Admin Panel*

Buyruqlar:
• /add_seller ID Ism PROMOKOD - Yangi sotuvchi qoshish
  Misol: /add_seller 123456789 Dilshod DILSHOD20

• /sellers - Barcha sotuvchilar royxati

• /stats - Umumiy statistika

🔗 Sayt: ${process.env.NEXT_PUBLIC_SITE_URL}
📊 Dashboard: ${process.env.NEXT_PUBLIC_SITE_URL}/dashboard

To'lov cheki kelganda shu yerda ✅ Tasdiqlash tugmasi bilan keladi.`
        return send(chatId, msg)
      } else {
        // Check if seller
        const { data: seller } = await supabaseAdmin.from('sellers').select('*').eq('telegram_id', chatId).single()
        if(seller){
          return send(chatId, `👋 Salom ${seller.name}! Sotuvchi panelingiz aktiv.

/seller - Balans va statistikani ko'rish
/balance - Balans

Promokodingiz: *${seller.promo_code}*`)
        }
        return send(chatId, `👋 Salom ${firstName}!

WebInvite - Online taklifnomalar

🌐 Saytimiz: ${process.env.NEXT_PUBLIC_SITE_URL}

Agar sotuvchi bo'lsangiz, admin sizni qo'shadi.`)
      }
    }

    // Seller panel
    if(text === '/seller' || text === '/balance' || text === '/balans'){
      try {
        const { data: seller } = await supabaseAdmin.from('sellers').select('*').eq('telegram_id', chatId).single()
        if(!seller) return send(chatId, '❌ Siz sotuvchi emassiz. Admin ga murojaat qiling.')
        const msg = `👤 *Sotuvchi:* ${seller.name}
🔑 *Promokod:* ${seller.promo_code}
💳 *Chegirma:* ${seller.discount_percent}%

📊 *Statistika:*
• Jami sotuv: ${seller.total_sales} ta
• Jami topgan: ${seller.total_earned} so'm
• Balans: ${seller.balance} so'm
• To'lab berildi: ${seller.total_paid} so'm`
        return send(chatId, msg)
      } catch(e){
        return send(chatId, '❌ Xatolik: Seller topilmadi')
      }
    }

    if(text === '/sellers' && String(chatId) === String(ADMIN_ID)){
      const { data: sellers } = await supabaseAdmin.from('sellers').select('*').order('created_at', {ascending:false}).limit(20)
      if(!sellers || sellers.length===0) return send(chatId, 'Hali sotuvchi yoq')
      let msg = '👥 *Sotuvchilar:*\n\n'
      sellers.forEach((s:any, i:number)=>{
        msg += `${i+1}. ${s.name} - ${s.promo_code} - ${s.balance} so'm - ${s.total_sales} sotuv\n`
      })
      return send(chatId, msg)
    }

    if(text === '/stats' && String(chatId) === String(ADMIN_ID)){
      const { count: invCount } = await supabaseAdmin.from('invitations').select('*', {count:'exact', head:true})
      const { count: sellerCount } = await supabaseAdmin.from('sellers').select('*', {count:'exact', head:true})
      return send(chatId, `📊 *Statistika:*\n\nTaklifnomalar: ${invCount}\nSotuvchilar: ${sellerCount}`)
    }

    // Admin commands
    if(String(chatId) === String(ADMIN_ID) && text.startsWith('/add_seller')){
      const parts = text.split(' ')
      const tgId = parts[1]
      const name = parts[2]
      const code = parts[3]
      if(!tgId || !name || !code) return send(chatId, 'Format: /add_seller TELEGRAM_ID Ism PROMOKOD\nMisol: /add_seller 123456789 Dilshod DILSHOD20')
      const { error } = await supabaseAdmin.from('sellers').insert({ telegram_id: Number(tgId), name, promo_code: code.toUpperCase(), username: '' })
      if(error) return send(chatId, `❌ Xato: ${error.message}`)
      return send(chatId, `✅ Sotuvchi qo'shildi: ${name} - ${code.toUpperCase()}`)
    }

    // Payment approve via button
    if(callback){
      const data = callback.data
      if(data && data.startsWith('approve_')){
        const invId = data.replace('approve_','')
        const { data: inv } = await supabaseAdmin.from('invitations').select('*, templates(price)').eq('id', invId).single()
        if(!inv) return NextResponse.json({ok:true})
        
        await supabaseAdmin.from('invitations').update({ status: 'active', activated_at: new Date().toISOString(), views_count: 0 }).eq('id', invId)
        
        if(inv.seller_id){
          const commission = Math.round((inv.final_paid_price || inv.price_to_pay) * 0.3)
          await supabaseAdmin.from('sales').insert({
            invitation_id: invId,
            seller_id: inv.seller_id,
            promo_code: inv.promo_code_used,
            original_price: inv.price_to_pay,
            paid_price: inv.final_paid_price || inv.price_to_pay,
            discount_amount: inv.discount_amount || 0,
            commission_amount: commission,
            status: 'approved'
          })
          const { data: seller } = await supabaseAdmin.from('sellers').select('*').eq('id', inv.seller_id).single()
          if(seller){
            await supabaseAdmin.from('sellers').update({
              balance: seller.balance + commission,
              total_earned: seller.total_earned + commission,
              total_sales: seller.total_sales + 1
            }).eq('id', inv.seller_id)
            await send(seller.telegram_id, `💰 Yangi sotuv! ${commission} so'm balansingizga qo'shildi. Taklifnoma: ${inv.slug}`)
          }
        }
        await send(chatId, `✅ ${inv.slug} faollashtirildi!`)
        // Try notify user if telegram_id stored
        try {
          const { data: profile } = await supabaseAdmin.from('profiles').select('telegram_id').eq('id', inv.user_id).single()
          if(profile?.telegram_id){
            await send(profile.telegram_id, `🎉 Taklifnomangiz faollashdi! Havola: ${process.env.NEXT_PUBLIC_SITE_URL}/i/${inv.slug}`)
          }
        } catch {}
      }
      if(data && data.startsWith('reject_')){
        const invId = data.replace('reject_','')
        await supabaseAdmin.from('invitations').update({ status: 'rejected' }).eq('id', invId)
        return send(chatId, `❌ ${invId} rad etildi`)
      }
    }

    return NextResponse.json({ok:true})
  } catch(err:any){
    console.error('Webhook error', err)
    return NextResponse.json({ok:true})
  }
}

async function send(chatId:any, text:string){
  const token = process.env.TELEGRAM_BOT_TOKEN
  try {
    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({ chat_id: chatId, text, parse_mode: 'Markdown' })
    })
  } catch(e){
    console.error('Send error', e)
  }
  return NextResponse.json({ok:true})
}
