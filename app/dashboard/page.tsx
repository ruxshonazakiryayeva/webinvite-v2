
'use client'
import { useState } from 'react'

export default function Dashboard(){
  const [form, setForm] = useState({ groom: 'Sardor', bride: 'Madina', date: '2026-09-12', venue: 'Samarqand', promo: '' })
  const [slug, setSlug] = useState('')

  const create = async () => {
    // Call API to create
    const res = await fetch('/api/invitations/create', { method: 'POST', body: JSON.stringify({ ...form, template_id: 'otkan-kunlar' }) })
    const data = await res.json()
    setSlug(data.slug)
  }

  return (
    <div className="min-h-screen bg-[#FFFBF5] p-8">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-3xl shadow">
        <h1 className="text-3xl font-bold mb-6">Yangi taklifnoma yaratish</h1>
        <div className="space-y-4">
          <input className="w-full border p-3 rounded-xl" placeholder="Kuyov ismi" value={form.groom} onChange={e=>setForm({...form, groom:e.target.value})} />
          <input className="w-full border p-3 rounded-xl" placeholder="Kelin ismi" value={form.bride} onChange={e=>setForm({...form, bride:e.target.value})} />
          <input className="w-full border p-3 rounded-xl" type="date" value={form.date} onChange={e=>setForm({...form, date:e.target.value})} />
          <input className="w-full border p-3 rounded-xl" placeholder="Joy" value={form.venue} onChange={e=>setForm({...form, venue:e.target.value})} />
          <input className="w-full border p-3 rounded-xl bg-yellow-50" placeholder="Promokod bormi? (masalan DILSHOD20)" value={form.promo} onChange={e=>setForm({...form, promo:e.target.value.toUpperCase()})} />
          <button onClick={create} className="w-full bg-black text-white py-3 rounded-xl">Yaratish (3 ta bepul ko'rish)</button>
          {slug && <a href={`/i/${slug}`} target="_blank" className="block text-center mt-4 text-blue-600">🔗 /i/{slug} - Ko'rish</a>}
        </div>
      </div>
    </div>
  )
}
