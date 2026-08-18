
import { supabaseAdmin } from '@/lib/supabase'
import OtkanKunlar from '@/components/templates/OtkanKunlar'
import GoldenVows from '@/components/templates/OtkanKunlar' // placeholder

export default async function InvitationPage({ params }: { params: { slug: string } }){
  const { data: inv } = await supabaseAdmin.from('invitations').select('*').eq('slug', params.slug).single()
  if(!inv) return <div>Topilmadi</div>

  // Increment views
  if(inv.status === 'trial' && inv.views_count >= inv.views_limit){
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FFFBF5] p-6">
        <div className="max-w-md bg-white p-8 rounded-3xl shadow-xl text-center">
          <h2 className="text-2xl font-bold mb-4">🔒 3 ta bepul ko'rish tugadi</h2>
          <p className="opacity-70 mb-2">Asl narx: {inv.price_to_pay} so'm</p>
          {inv.promo_code_used && <p className="text-green-600">Promokod {inv.promo_code_used}: -{inv.discount_amount} so'm</p>}
          <p className="font-bold text-xl mt-2">To'lanishi kerak: {inv.final_paid_price || inv.price_to_pay} so'm</p>
          <div className="mt-6 p-4 bg-gray-50 rounded-2xl text-left">
            <p className="text-sm">1. To'lovni Click/Payme ga tashlang</p>
            <p className="text-sm">2. Chekni yuklang</p>
            <p className="text-sm">3. Admin tasdiqlaydi va cheksiz bo'ladi</p>
          </div>
          <button className="mt-6 w-full bg-black text-white py-3 rounded-xl">Chek yuklash</button>
        </div>
      </div>
    )
  }

  // Count view
  if(inv.status === 'trial'){
    await supabaseAdmin.from('invitations').update({ views_count: inv.views_count + 1 }).eq('id', inv.id)
  }

  // Render template by id
  if(inv.template_id === 'otkan-kunlar'){
    return <OtkanKunlar groomName={inv.groom_name} brideName={inv.bride_name} date={inv.event_date} venue={inv.venue_name} greeting={inv.greeting_text} />
  }
  return <OtkanKunlar groomName={inv.groom_name} brideName={inv.bride_name} date={inv.event_date} venue={inv.venue_name} />
}
