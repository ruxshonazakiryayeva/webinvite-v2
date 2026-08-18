
import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function POST(req: NextRequest){
  const body = await req.json()
  const { groom, bride, date, venue, promo, template_id } = body

  // Check promo
  let seller = null
  let discount = 0
  let finalPrice = 99000
  let originalPrice = 99000

  const { data: tmpl } = await supabaseAdmin.from('templates').select('*').eq('id', template_id).single()
  if(tmpl) originalPrice = tmpl.price

  if(promo){
    const { data: s } = await supabaseAdmin.from('sellers').select('*').eq('promo_code', promo.toUpperCase()).eq('is_active', true).single()
    if(s){
      seller = s
      discount = Math.round(originalPrice * s.discount_percent / 100)
      finalPrice = originalPrice - discount
    }
  } else {
    finalPrice = originalPrice
  }

  const slug = `${groom}-${bride}-${Date.now()}`.toLowerCase().replace(/\s+/g,'-')

  // For demo, use first profile or create anon
  const { data: profiles } = await supabaseAdmin.from('profiles').select('*').limit(1)
  let userId = profiles?.[0]?.id
  if(!userId){
    const { data: p } = await supabaseAdmin.from('profiles').insert({ telegram_id: Math.floor(Math.random()*1000000000), first_name: groom }).select().single()
    userId = p.id
  }

  const { data: inv, error } = await supabaseAdmin.from('invitations').insert({
    user_id: userId,
    template_id,
    slug,
    price_to_pay: originalPrice,
    groom_name: groom,
    bride_name: bride,
    event_date: date,
    venue_name: venue,
    promo_code_used: promo || null,
    seller_id: seller?.id || null,
    discount_amount: discount,
    final_paid_price: finalPrice,
    status: 'trial',
    views_count: 0,
    views_limit: 3
  }).select().single()

  if(error) return NextResponse.json({ error: error.message }, { status: 400 })
  return NextResponse.json({ slug: inv.slug, finalPrice, discount })
}
