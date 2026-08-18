
import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

// Telegram Bot Webhook - Admin + Seller panel
export async function POST(req: NextRequest){
  const body = await req.json()
  const message = body.message
  const callback = body.callback_query
  if(!message && !callback) return NextResponse.json({ok:true})

  const ADMIN_ID = process.env.TELEGRAM_ADMIN_ID
  const chatId = message?.chat?.id || callback?.message?.chat?.id
  const text = message?.text || ''

  // Seller panel
  if(text === '/seller' || text === '/balance'){
    const { data: seller } = await supabaseAdmin.from('sellers').select('*').eq('telegram_id', chatId).single()
    if(!seller) return send(chatId, '❌ Siz sotuvchi emassiz. Admin ga murojaat qiling.')
    const msg = `👤 Sotuvchi: ${seller.name}\n🔑 Promokod: ${seller.promo_code}\n\n📊 Statistika:\n- Jami sotuv: ${seller.total_sales} ta\n- Jami topgan: ${seller.total_earned} so'm\n- Balans: ${seller.balance} so'm\n- To'lab berildi: ${seller.total_paid} so'm`
    return send(chatId, msg)
  }

  // Admin commands
  if(String(chatId) === String(ADMIN_ID) && text.startsWith('/add_seller')){
    // /add_seller 123456789 Dilshod DILSHOD20
    const parts = text.split(' ')
    const tgId = parts[1]
    const name = parts[2]
    const code = parts[3]
    if(!tgId || !name || !code) return send(chatId, 'Format: /add_seller TELEGRAM_ID Ism PROMOKOD')
    await supabaseAdmin.from('sellers').insert({ telegram_id: Number(tgId), name, promo_code: code.toUpperCase(), username: '' })
    return send(chatId, `✅ Sotuvchi qo'shildi: ${name} - ${code}`)
  }

  // Payment approve via button
  if(callback){
    const data = callback.data // approve_INVITATIONID
    if(data.startsWith('approve_')){
      const invId = data.replace('approve_','')
      const { data: inv } = await supabaseAdmin.from('invitations').select('*, templates(price)').eq('id', invId).single()
      if(!inv) return NextResponse.json({ok:true})
      
      // Activate invitation
      await supabaseAdmin.from('invitations').update({ status: 'active', activated_at: new Date().toISOString(), views_count: 0 }).eq('id', invId)
      
      // If has seller, create sale and update balance
      if(inv.seller_id){
        const commission = Math.round(inv.final_paid_price * 0.3)
        await supabaseAdmin.from('sales').insert({
          invitation_id: invId,
          seller_id: inv.seller_id,
          promo_code: inv.promo_code_used,
          original_price: inv.price_to_pay,
          paid_price: inv.final_paid_price,
          discount_amount: inv.discount_amount,
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
      await send(inv.user_id, `🎉 Taklifnomangiz faollashdi! Havola: ${process.env.NEXT_PUBLIC_SITE_URL}/i/${inv.slug}`)
    }
  }

  return NextResponse.json({ok:true})
}

async function send(chatId:any, text:string){
  const token = process.env.TELEGRAM_BOT_TOKEN
  await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({ chat_id: chatId, text, parse_mode: 'Markdown' })
  })
  return NextResponse.json({ok:true})
}
