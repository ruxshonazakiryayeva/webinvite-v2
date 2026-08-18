import { supabaseAdmin } from '@/lib/supabase'
import OtkanKunlar from '@/components/templates/OtkanKunlar'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function InvitationPage({ params }: { params: { slug: string } }){
  const { data: inv } = await supabaseAdmin.from('invitations').select('*').eq('slug', params.slug).maybeSingle()
  if(!inv) return <div className="min-h-screen flex items-center justify-center bg-black text-white">Topilmadi: {params.slug}</div>

  if(inv.status === 'active'){
    return <OtkanKunlar groomName={inv.groom_name} brideName={inv.bride_name} date={inv.event_date} venue={inv.venue_name} greeting={inv.greeting_text} />
  }

  const limit = inv.views_limit || 3
  const count = inv.views_count || 0
  if(count >= limit){
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FFFBF5] p-6">
        <div className="max-w-md bg-white p-8 rounded-3xl shadow-xl text-center">
          <h2 className="text-2xl font-bold mb-4">🔒 3 ta bepul ko'rish tugadi</h2>
          <p>To'lov: {(inv.final_paid_price || inv.price_to_pay)?.toLocaleString()} so'm</p>
          <button className="mt-6 w-full bg-black text-white py-3 rounded-xl">Chek yuklash</button>
        </div>
      </div>
    )
  }
  await supabaseAdmin.from('invitations').update({ views_count: count + 1 }).eq('id', inv.id)
  return <OtkanKunlar groomName={inv.groom_name} brideName={inv.bride_name} date={inv.event_date} venue={inv.venue_name} greeting={inv.greeting_text} />
}
