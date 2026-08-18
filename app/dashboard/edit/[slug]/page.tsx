'use client'
import { useState, useEffect } from 'react'

export default function EditPage({ params }: { params: { slug: string } }){
  const [activeTab, setActiveTab] = useState('asosiy')
  const [form, setForm] = useState({
    groom: 'Otabek',
    bride: 'Kumush',
    date: '2027-07-27',
    time: '18:00',
    venue: "Marg'ilon restorani, Farg'ona",
    greeting_uz: "Farzandlarimizning nikoh to'yi munosabati bilan sizni to'y oqshomiga lutfan taklif etamiz.",
    greeting_ru: "Приглашаем Вас на торжество по случаю свадьбы наших детей.",
    greeting_en: "We cordially invite you to the wedding celebration.",
    story_uz: "Ikki qalbning uchrashuvi taqdir inoyati.",
    music: 'romantic-1',
    gallery: [] as string[],
    lang: 'uz',
    map_lat: 40.376,
    map_lng: 71.786
  })

  const tabs = [
    { id: 'asosiy', label: 'Asosiy', icon: '👫' },
    { id: 'matn', label: 'Matnlar (3 til)', icon: '🌐' },
    { id: 'galereya', label: 'Galereya', icon: '🖼️' },
    { id: 'musiqa', label: 'Musiqa', icon: '🎵' },
    { id: 'xarita', label: 'Xarita', icon: '📍' },
    { id: 'sozlama', label: 'Sozlama', icon: '⚙️' },
  ]

  const musics = [
    { id: 'romantic-1', name: 'Romantic Piano', duration: '3:24' },
    { id: 'romantic-2', name: 'Wedding Waltz', duration: '2:58' },
    { id: 'romantic-3', name: 'Love Story', duration: '3:12' },
    { id: 'none', name: 'Musiqasiz', duration: '' },
  ]

  return (
    <div className="min-h-screen bg-[#F8F6F3] flex flex-col md:flex-row">
      {/* Left - Preview - like chorlove */}
      <div className="flex-1 bg-[#0A0A0A] relative md:sticky md:top-0 md:h-screen overflow-hidden flex flex-col">
        <div className="p-4 flex items-center justify-between border-b border-white/10">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-white text-[12px] tracking-widest uppercase">Live Preview</span>
          </div>
          <a href={`/i/${params.slug}`} target="_blank" className="text-[11px] text-white/60 hover:text-white border border-white/20 px-3 py-1 rounded-full">
            ↗ Ochish
          </a>
        </div>
        <div className="flex-1 relative overflow-auto">
          <div className="w-full max-w-[400px] mx-auto bg-[#080810] min-h-full shadow-2xl">
            {/* Mini preview of invitation */}
            <div className="p-6 text-center text-white">
              <p className="text-[10px] tracking-[0.4em] opacity-40 uppercase mb-8">Yulduzlar to&apos;la osmon ostida</p>
              <p className="text-[18px] tracking-widest text-[#D4AF37] mb-2">{form.date}</p>
              <p className="text-[11px] opacity-50 uppercase tracking-widest">{form.venue}</p>
              <div className="my-12">
                <p className="text-[12px] opacity-40 uppercase mb-6">— Aziz mehmonimiz —</p>
                <h1 className="text-[36px] leading-[0.9] font-light">
                  {form.groom}<br/>
                  <span className="text-[20px] text-[#D4AF37] italic">&</span><br/>
                  {form.bride}
                </h1>
              </div>
              <div className="bg-white text-black rounded-[20px] p-4 text-left mt-8">
                <p className="text-[11px] opacity-40 uppercase tracking-widest">Sana</p>
                <p className="font-medium">{form.date}, {form.time}</p>
                <p className="text-[11px] opacity-40 uppercase tracking-widest mt-3">Manzil</p>
                <p className="text-[14px]">{form.venue}</p>
              </div>
              <div className="grid grid-cols-3 gap-2 mt-4">
                {[1,2,3].map(i=>(
                  <div key={i} className="aspect-square bg-white/10 rounded-[12px]" />
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="p-3 border-t border-white/10 flex gap-2">
          <div className="flex-1 bg-white/10 rounded-full px-3 py-2 text-[11px] text-white/60">/i/{params.slug}</div>
          <button className="bg-white text-black px-4 py-2 rounded-full text-[11px] font-medium">Nusxa olish</button>
        </div>
      </div>

      {/* Right - Editor - like chorlove.uz */}
      <div className="w-full md:w-[420px] bg-white border-l border-black/10 flex flex-col h-screen">
        <div className="p-6 border-b border-black/5">
          <h1 className="text-[20px] font-semibold">Tahrirlash</h1>
          <p className="text-[13px] opacity-60 mt-1">ChorLove uslubida - barcha sozlamalar</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 p-2 bg-[#F8F6F3] mx-4 mt-4 rounded-full overflow-x-auto">
          {tabs.map(tab=>(
            <button
              key={tab.id}
              onClick={()=>setActiveTab(tab.id)}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-[12px] font-medium transition-all flex items-center gap-1.5 ${activeTab===tab.id ? 'bg-black text-white shadow' : 'text-black/60 hover:bg-black/5'}`}
            >
              <span>{tab.icon}</span> {tab.label}
            </button>
          ))}
        </div>

        <div className="flex-1 overflow-auto p-6 space-y-6">
          {activeTab==='asosiy' && (
            <div className="space-y-5">
              <div>
                <label className="text-[11px] tracking-widest uppercase opacity-50 mb-2 block">Kuyov ismi</label>
                <input value={form.groom} onChange={e=>setForm({...form, groom:e.target.value})} className="w-full border border-black/10 rounded-[14px] px-4 py-3 text-[15px] outline-none focus:border-black/20" />
              </div>
              <div>
                <label className="text-[11px] tracking-widest uppercase opacity-50 mb-2 block">Kelin ismi</label>
                <input value={form.bride} onChange={e=>setForm({...form, bride:e.target.value})} className="w-full border border-black/10 rounded-[14px] px-4 py-3 text-[15px] outline-none focus:border-black/20" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] tracking-widest uppercase opacity-50 mb-2 block">Sana</label>
                  <input type="date" value={form.date} onChange={e=>setForm({...form, date:e.target.value})} className="w-full border border-black/10 rounded-[14px] px-4 py-3 text-[15px]" />
                </div>
                <div>
                  <label className="text-[11px] tracking-widest uppercase opacity-50 mb-2 block">Vaqt</label>
                  <input type="time" value={form.time} onChange={e=>setForm({...form, time:e.target.value})} className="w-full border border-black/10 rounded-[14px] px-4 py-3 text-[15px]" />
                </div>
              </div>
              <div>
                <label className="text-[11px] tracking-widest uppercase opacity-50 mb-2 block">To'yxona / Manzil</label>
                <input value={form.venue} onChange={e=>setForm({...form, venue:e.target.value})} className="w-full border border-black/10 rounded-[14px] px-4 py-3 text-[15px]" placeholder="Marg'ilon restorani, Farg'ona" />
                <p className="text-[11px] opacity-40 mt-2">Xarita bo'limida nuqtani belgilang</p>
              </div>
            </div>
          )}

          {activeTab==='matn' && (
            <div className="space-y-6">
              <div className="bg-[#FFFBF0] border border-[#D4AF37]/20 rounded-[16px] p-4">
                <p className="text-[12px] font-medium mb-1">🌐 3 tilda matnlar</p>
                <p className="text-[11px] opacity-60">Mehmon tilni tanlashi bilan matn o'zgaradi</p>
              </div>
              <div>
                <label className="text-[11px] tracking-widest uppercase opacity-50 mb-2 block">Taklif matni - UZ</label>
                <textarea value={form.greeting_uz} onChange={e=>setForm({...form, greeting_uz:e.target.value})} rows={3} className="w-full border border-black/10 rounded-[14px] px-4 py-3 text-[14px] resize-none" />
              </div>
              <div>
                <label className="text-[11px] tracking-widest uppercase opacity-50 mb-2 block">Приглашение - RU</label>
                <textarea value={form.greeting_ru} onChange={e=>setForm({...form, greeting_ru:e.target.value})} rows={3} className="w-full border border-black/10 rounded-[14px] px-4 py-3 text-[14px] resize-none" />
              </div>
              <div>
                <label className="text-[11px] tracking-widest uppercase opacity-50 mb-2 block">Invitation - EN</label>
                <textarea value={form.greeting_en} onChange={e=>setForm({...form, greeting_en:e.target.value})} rows={3} className="w-full border border-black/10 rounded-[14px] px-4 py-3 text-[14px] resize-none" />
              </div>
              <div>
                <label className="text-[11px] tracking-widest uppercase opacity-50 mb-2 block">Hikoya - UZ</label>
                <textarea value={form.story_uz} onChange={e=>setForm({...form, story_uz:e.target.value})} rows={2} className="w-full border border-black/10 rounded-[14px] px-4 py-3 text-[14px] resize-none" />
              </div>
            </div>
          )}

          {activeTab==='galereya' && (
            <div className="space-y-4">
              <div className="bg-[#F8F6F3] rounded-[16px] p-4">
                <p className="text-[13px] font-medium">Galereya rasmlari</p>
                <p className="text-[11px] opacity-60 mt-1">6 tagacha rasm yuklang. Birinchi rasm asosiy bo'ladi.</p>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {[...Array(6)].map((_,i)=>(
                  <div key={i} className="aspect-square border-2 border-dashed border-black/10 rounded-[16px] flex flex-col items-center justify-center hover:border-black/20 cursor-pointer group bg-[#FAFAFA]">
                    <span className="text-[20px] group-hover:scale-110 transition-transform">📷</span>
                    <span className="text-[10px] opacity-40 mt-1">Yuklash</span>
                  </div>
                ))}
              </div>
              <div className="bg-yellow-50 border border-yellow-200 rounded-[12px] p-3">
                <p className="text-[11px]">💡 Tavsiya: 800x1000 o'lcham, JPG, 2MB gacha</p>
              </div>
            </div>
          )}

          {activeTab==='musiqa' && (
            <div className="space-y-4">
              <div className="bg-[#F8F6F3] rounded-[16px] p-4">
                <p className="text-[13px] font-medium">Fon musiqasi</p>
                <p className="text-[11px] opacity-60 mt-1">Mehmon saytni ochganda avtomatik chaladi</p>
              </div>
              {musics.map(m=>(
                <div key={m.id} className={`border rounded-[14px] p-4 flex items-center justify-between cursor-pointer transition-all ${form.music===m.id ? 'border-black bg-black text-white' : 'border-black/10 hover:border-black/20'}`} onClick={()=>setForm({...form, music:m.id})}>
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${form.music===m.id ? 'bg-white/20' : 'bg-black/5'}`}>
                      {form.music===m.id ? '▶' : '🎵'}
                    </div>
                    <div>
                      <p className="text-[14px] font-medium">{m.name}</p>
                      <p className={`text-[11px] ${form.music===m.id ? 'text-white/60' : 'opacity-50'}`}>{m.duration}</p>
                    </div>
                  </div>
                  {form.music===m.id && <div className="w-5 h-5 rounded-full bg-white text-black flex items-center justify-center text-[10px]">✓</div>}
                </div>
              ))}
              <button className="w-full border border-black/10 rounded-full py-3 text-[12px]">+ O'z musiqangizni yuklash</button>
            </div>
          )}

          {activeTab==='xarita' && (
            <div className="space-y-4">
              <div className="bg-[#F8F6F3] rounded-[16px] p-4">
                <p className="text-[13px] font-medium">Joylashuv</p>
                <p className="text-[11px] opacity-60 mt-1">Xaritada to'yxona joyini belgilang</p>
              </div>
              <div className="h-[240px] bg-[#E8E0D0] rounded-[16px] border border-black/10 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-30" style={{backgroundImage: 'radial-gradient(circle at 30% 40%, #D4AF37 1px, transparent 1px)', backgroundSize: '20px 20px'}} />
                <div className="text-center">
                  <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center mx-auto mb-2">📍</div>
                  <p className="text-[12px] font-medium">{form.venue}</p>
                  <p className="text-[11px] opacity-60">Xaritada belgilangan</p>
                </div>
                <div className="absolute bottom-2 left-2 right-2 flex gap-2">
                  <button className="flex-1 bg-black text-white py-2 rounded-full text-[11px]">Yandex da ochish</button>
                  <button className="flex-1 bg-white border py-2 rounded-full text-[11px]">Google</button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <input placeholder="Lat: 40.376" className="border border-black/10 rounded-[12px] px-3 py-2.5 text-[13px]" />
                <input placeholder="Lng: 71.786" className="border border-black/10 rounded-[12px] px-3 py-2.5 text-[13px]" />
              </div>
              <button className="w-full bg-[#FFFBF0] border border-[#D4AF37]/30 rounded-full py-3 text-[12px]">📍 Hozirgi joyni belgilash</button>
            </div>
          )}

          {activeTab==='sozlama' && (
            <div className="space-y-4">
              <div className="border border-black/10 rounded-[16px] p-4">
                <p className="text-[13px] font-medium mb-3">Ko'rinish</p>
                <div className="space-y-3">
                  <div className="flex justify-between items-center"><span className="text-[13px]">Yulduzlar effekti</span><div className="w-10 h-6 bg-black rounded-full relative"><div className="w-4 h-4 bg-white rounded-full absolute top-1 right-1" /></div></div>
                  <div className="flex justify-between items-center"><span className="text-[13px]">Countdown</span><div className="w-10 h-6 bg-black rounded-full relative"><div className="w-4 h-4 bg-white rounded-full absolute top-1 right-1" /></div></div>
                  <div className="flex justify-between items-center"><span className="text-[13px]">Galereya</span><div className="w-10 h-6 bg-black rounded-full relative"><div className="w-4 h-4 bg-white rounded-full absolute top-1 right-1" /></div></div>
                </div>
              </div>
              <div className="border border-red-200 bg-red-50 rounded-[16px] p-4">
                <p className="text-[13px] font-medium text-red-700">Xavfli zona</p>
                <button className="mt-3 w-full bg-red-600 text-white py-2.5 rounded-full text-[12px]">Taklifnomani o'chirish</button>
              </div>
            </div>
          )}
        </div>

        {/* Bottom save */}
        <div className="p-4 border-t border-black/10 bg-white">
          <div className="flex gap-2">
            <button className="flex-1 border border-black/10 py-3 rounded-full text-[13px]">Bekor qilish</button>
            <button className="flex-1 bg-black text-white py-3 rounded-full text-[13px] font-medium">💾 Saqlash va yangilash</button>
          </div>
          <p className="text-[10px] text-center opacity-40 mt-2">Avtomatik saqlanadi • {params.slug}</p>
        </div>
      </div>
    </div>
  )
}
