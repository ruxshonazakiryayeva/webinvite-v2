'use client'
import { useEffect, useState } from 'react'

type Props = {
  groomName: string
  brideName: string
  date: string
  venue: string
  greeting?: string
}

export default function OtkanKunlar({ groomName, brideName, date, venue, greeting }: Props){
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  const [guestName, setGuestName] = useState('')
  const [attendance, setAttendance] = useState('Ha, kelaman')
  const [wish, setWish] = useState('')
  const [submitted, setSubmitted] = useState(false)
  
  useEffect(() => {
    const parseDate = () => {
      try {
        // Try to parse various date formats
        const d = new Date(date)
        if(!isNaN(d.getTime())) return d.getTime()
        // Fallback
        return new Date('2027-07-27').getTime()
      } catch { return new Date('2027-07-27').getTime() }
    }
    const target = parseDate()
    const interval = setInterval(() => {
      const now = new Date().getTime()
      const diff = target - now
      if(diff > 0){
        setTimeLeft({
          days: Math.floor(diff / (1000*60*60*24)),
          hours: Math.floor((diff % (1000*60*60*24)) / (1000*60*60)),
          minutes: Math.floor((diff % (1000*60*60)) / (1000*60)),
          seconds: Math.floor((diff % (1000*60)) / 1000)
        })
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      }
    }, 1000)
    return () => clearInterval(interval)
  }, [date])

  const g = groomName || 'Otabek'
  const b = brideName || 'Kumush'
  const d = date || '27.07.2027'
  const v = venue || "Marg'ilon restorani, Farg'ona"

  const handleRSVP = async () => {
    if(!guestName.trim()) return alert('Ismingizni kiriting')
    setSubmitted(true)
    setTimeout(()=> setSubmitted(false), 3000)
    setGuestName('')
    setWish('')
  }

  return (
    <div className="w-full bg-[#0A0A0A] text-white selection:bg-[#D4AF37]/30">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600;700&family=Manrope:wght@300;400;500&display=swap');
        .font-serif { font-family: 'Cormorant Garamond', serif; }
        .font-sans { font-family: 'Manrope', sans-serif; }
        @keyframes twinkle { 0%,100%{opacity:0.2; transform:scale(1)} 50%{opacity:1; transform:scale(1.2)} }
        @keyframes floatSlow { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        @keyframes heartbeat { 0%,100%{transform:scale(1)} 50%{transform:scale(1.08)} }
      `}</style>

      {/* HERO - Exact clone of wedding-otabekandkumush hero */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
        {/* Background - deep navy with subtle texture */}
        <div className="absolute inset-0 bg-[#080810]" />
        <div className="absolute inset-0 opacity-[0.4]" style={{
          backgroundImage: `radial-gradient(ellipse at top, rgba(212,175,55,0.15) 0%, transparent 60%), radial-gradient(ellipse at bottom, rgba(20,20,40,0.8) 0%, transparent 70%)`
        }} />
        {/* Stars */}
        <div className="absolute inset-0">
          {Array.from({length: 100}).map((_,i) => (
            <div key={i} className="absolute bg-white rounded-full" style={{
              left: `${(i*37)%100}%`,
              top: `${(i*57)%65}%`,
              width: `${i%3===0 ? 2 : 1}px`,
              height: `${i%3===0 ? 2 : 1}px`,
              animation: `twinkle ${2 + (i%4)}s infinite`,
              animationDelay: `${(i%5)*0.5}s`,
            }} />
          ))}
        </div>
        {/* Soft vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#080810]" />

        <div className="relative z-10 text-center w-full max-w-[520px] py-20">
          <p className="font-sans text-[11px] tracking-[0.45em] text-white/40 uppercase mb-16 font-light">Yulduzlar to&apos;la osmon ostida</p>
          
          <div className="space-y-4 mb-20">
            <p className="font-serif text-[22px] md:text-[26px] tracking-[0.15em] text-[#E8C15A] font-light">{d}</p>
            <div className="flex items-center justify-center gap-4 my-6">
              <div className="w-8 h-px bg-[#D4AF37]/20" />
              <div className="w-1 h-1 rounded-full bg-[#D4AF37]/40" />
              <div className="w-8 h-px bg-[#D4AF37]/20" />
            </div>
            <p className="font-sans text-[12px] tracking-[0.25em] text-white/50 uppercase font-light">{v}</p>
          </div>

          <div className="mt-32">
            <button 
              onClick={()=>document.getElementById('invitation')?.scrollIntoView({behavior:'smooth'})}
              className="group flex flex-col items-center gap-4 mx-auto cursor-pointer"
            >
              <span className="font-sans text-[10px] tracking-[0.35em] text-white/30 group-hover:text-white/60 transition-colors uppercase">Pastga</span>
              <div className="w-[36px] h-[36px] rounded-full border border-white/15 group-hover:border-[#D4AF37]/40 flex items-center justify-center transition-all group-hover:scale-105">
                <span className="text-[12px] text-white/40 group-hover:text-[#D4AF37] transition-colors">↓</span>
              </div>
            </button>
          </div>
        </div>
      </section>

      {/* AZIZ MEHMONIMIZ - White premium card */}
      <section id="invitation" className="relative bg-[#FFFDFA] text-[#121212] py-28 md:py-36 px-6">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1200px] h-px bg-gradient-to-r from-transparent via-[#D4AF37]/20 to-transparent" />
        
        <div className="max-w-[520px] mx-auto text-center">
          <p className="font-sans text-[11px] tracking-[0.4em] text-[#8B0000]/50 uppercase mb-14 font-medium">— Aziz mehmonimiz —</p>
          
          <div className="mb-14">
            <p className="font-serif text-[18px] md:text-[19px] leading-[1.7] text-[#2A2A2A]/80 font-light">
              {greeting || "Farzandlarimizning nikoh to'yi munosabati bilan sizni to'y oqshomiga lutfan taklif etamiz."}
            </p>
          </div>

          <div className="my-16">
            <h1 className="font-serif font-light tracking-tight leading-[0.85]">
              <span className="block text-[54px] md:text-[64px] text-[#0A0A0A]">{g}</span>
              <span className="block my-3 font-serif italic text-[26px] text-[#C9A84C] font-light">&</span>
              <span className="block text-[54px] md:text-[64px] text-[#0A0A0A]">{b}</span>
            </h1>
          </div>

          <div className="flex items-center justify-center gap-3 my-16">
            <div className="w-1 h-1 rounded-full bg-[#D4AF37]/30" />
            <div className="w-16 h-px bg-[#D4AF37]/15" />
            <span className="font-serif text-[#D4AF37] text-[18px]">❧</span>
            <div className="w-16 h-px bg-[#D4AF37]/15" />
            <div className="w-1 h-1 rounded-full bg-[#D4AF37]/30" />
          </div>

          <button onClick={()=>document.getElementById('story')?.scrollIntoView({behavior:'smooth'})} className="font-sans text-[10px] tracking-[0.35em] text-[#121212]/25 hover:text-[#121212]/50 transition-colors uppercase cursor-pointer">
            Pastga
          </button>
        </div>
      </section>

      {/* BIZNING HIKOYAMIZ - Dark */}
      <section id="story" className="relative bg-[#0D0D0D] text-white py-28 md:py-36 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-[#111111] to-[#0D0D0D]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#D4AF37]/[0.02] rounded-full blur-[80px]" />
        
        <div className="relative max-w-[560px] mx-auto text-center">
          <h2 className="font-serif text-[34px] md:text-[40px] font-light tracking-wide mb-12">Bizning hikoyamiz</h2>
          
          <div className="space-y-6 font-serif text-[18px] md:text-[19px] leading-[1.8] text-white/65 font-light">
            <p>Ikki qalbning uchrashuvi taqdir inoyati.</p>
            <p>Ularning muhabbati sinovlardan o&apos;tib, sabr, ishonch va hurmat bilan yanada mustahkam bo&apos;ldi.</p>
            <p className="text-white/80">Endi esa bu yo&apos;l — bir umr davom etuvchi baxt yo&apos;liga aylanadi.</p>
          </div>

          <div className="mt-14 pt-8 border-t border-white/[0.06]">
            <p className="font-serif italic text-[17px] text-[#D4AF37]/70 leading-relaxed">
              &quot;Sevgi — sabr bilan go&apos;zal, vafo bilan abadiy bo&apos;lur.&quot;
            </p>
          </div>

          <button onClick={()=>document.getElementById('event')?.scrollIntoView({behavior:'smooth'})} className="mt-16 font-sans text-[10px] tracking-[0.35em] text-white/20 hover:text-white/40 transition-colors uppercase cursor-pointer">
            Pastga
          </button>
        </div>
      </section>

      {/* TO'Y MAROSIMI - White with details */}
      <section id="event" className="relative bg-[#FFFDFA] text-[#121212] py-28 md:py-32 px-6">
        <div className="max-w-[460px] mx-auto">
          <h2 className="font-serif text-[26px] md:text-[28px] font-light tracking-[0.2em] text-center uppercase mb-20">To&apos;y Marosimi</h2>
          
          <div className="space-y-0">
            <div className="flex justify-between items-center py-7 border-b border-[#121212]/[0.07]">
              <span className="font-sans text-[11px] tracking-[0.25em] text-[#121212]/35 uppercase font-medium">Sana</span>
              <span className="font-serif text-[18px] md:text-[19px] text-[#121212]">{d}, Seshanba</span>
            </div>
            <div className="flex justify-between items-center py-7 border-b border-[#121212]/[0.07]">
              <span className="font-sans text-[11px] tracking-[0.25em] text-[#121212]/35 uppercase font-medium">Vaqt</span>
              <span className="font-serif text-[18px] md:text-[19px] text-[#121212]">18:00</span>
            </div>
            <div className="flex justify-between items-start py-7">
              <span className="font-sans text-[11px] tracking-[0.25em] text-[#121212]/35 uppercase font-medium mt-1">Manzil</span>
              <span className="font-serif text-[18px] md:text-[19px] text-[#121212] text-right max-w-[240px] leading-[1.4]">{v}</span>
            </div>
          </div>

          <a 
            href={`https://yandex.uz/maps/?text=${encodeURIComponent(v)}`} 
            target="_blank"
            className="mt-14 w-full bg-[#121212] text-white py-[18px] rounded-full font-sans text-[11px] tracking-[0.22em] uppercase flex items-center justify-center gap-2.5 hover:bg-black hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 shadow-lg shadow-black/10"
          >
            <span className="text-[13px]">📍</span> Xaritada ochish
          </a>

          <div className="mt-12 text-center">
            <button onClick={()=>document.getElementById('countdown')?.scrollIntoView({behavior:'smooth'})} className="font-sans text-[10px] tracking-[0.35em] text-[#121212]/25 hover:text-[#121212]/50 transition-colors uppercase cursor-pointer">
              Pastga
            </button>
          </div>
        </div>
      </section>

      {/* TO'YGA QANCHA QOLDI - Dark countdown */}
      <section id="countdown" className="relative bg-[#080808] text-white py-28 md:py-32 px-6">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0D0D0D] to-[#080808]" />
        
        <div className="relative max-w-[560px] mx-auto text-center">
          <h2 className="font-serif text-[22px] md:text-[24px] font-light tracking-[0.25em] uppercase mb-20 text-white/90">To&apos;yga qancha qoldi?</h2>
          
          <div className="grid grid-cols-4 gap-6 md:gap-10">
            {[
              { label: 'Kun', value: timeLeft.days },
              { label: 'Soat', value: timeLeft.hours },
              { label: 'Daqiqa', value: timeLeft.minutes },
              { label: 'Soniya', value: timeLeft.seconds },
            ].map((item) => (
              <div key={item.label} className="text-center">
                <div className="font-serif text-[38px] md:text-[52px] font-light leading-none tracking-tight">
                  {String(item.value).padStart(2,'0')}
                </div>
                <div className="font-sans text-[10px] tracking-[0.25em] text-white/30 uppercase mt-3 font-medium">{item.label}</div>
              </div>
            ))}
          </div>

          <div className="mt-20">
            <button onClick={()=>document.getElementById('rsvp')?.scrollIntoView({behavior:'smooth'})} className="font-sans text-[10px] tracking-[0.35em] text-white/20 hover:text-white/40 transition-colors uppercase cursor-pointer">
              Pastga
            </button>
          </div>
        </div>
      </section>

      {/* MEHMON TASDIQLASH - White form */}
      <section id="rsvp" className="relative bg-[#FFFDFA] text-[#121212] py-28 md:py-36 px-6">
        <div className="max-w-[440px] mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-serif text-[30px] md:text-[32px] font-light mb-4 tracking-wide">Mehmon tasdiqlash</h2>
            <p className="font-sans text-[14px] text-[#121212]/50 font-light">Iltimos, ishtirokingizni bizga ma&apos;lum qiling.</p>
          </div>
          
          <div className="space-y-4">
            <div className="relative">
              <input 
                value={guestName}
                onChange={(e)=>setGuestName(e.target.value)}
                placeholder="Ismingiz" 
                className="w-full px-7 py-[18px] rounded-full border border-[#121212]/10 bg-white font-sans text-[15px] outline-none focus:border-[#D4AF37]/40 focus:bg-white transition-all placeholder:text-[#121212]/30"
              />
            </div>
            <div className="relative">
              <select 
                value={attendance}
                onChange={(e)=>setAttendance(e.target.value)}
                className="w-full px-7 py-[18px] rounded-full border border-[#121212]/10 bg-white font-sans text-[15px] outline-none focus:border-[#D4AF37]/40 transition-all appearance-none cursor-pointer"
              >
                <option>Ha, kelaman</option>
                <option>Kelolmayman</option>
              </select>
              <div className="absolute right-7 top-1/2 -translate-y-1/2 pointer-events-none text-[#121212]/20">▼</div>
            </div>
            <textarea 
              value={wish}
              onChange={(e)=>setWish(e.target.value)}
              placeholder="Tabrik so'zlaringiz..." 
              rows={4} 
              className="w-full px-7 py-5 rounded-[28px] border border-[#121212]/10 bg-white font-sans text-[15px] outline-none focus:border-[#D4AF37]/40 transition-all resize-none placeholder:text-[#121212]/30 leading-relaxed"
            />
            <button 
              onClick={handleRSVP}
              className="w-full bg-[#121212] text-white py-[19px] rounded-full font-sans text-[11px] tracking-[0.22em] uppercase hover:bg-black hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 shadow-lg shadow-black/10 disabled:opacity-50"
            >
              {submitted ? '✓ Yuborildi!' : 'Tasdiqlash yuborish'}
            </button>
            {submitted && (
              <p className="text-center text-[13px] text-green-700 font-sans pt-2 animate-pulse">Rahmat! Javobingiz qabul qilindi ❤️</p>
            )}
          </div>

          <div className="mt-14 text-center">
            <button onClick={()=>document.getElementById('closing')?.scrollIntoView({behavior:'smooth'})} className="font-sans text-[10px] tracking-[0.35em] text-[#121212]/25 hover:text-[#121212]/50 transition-colors uppercase cursor-pointer">
              Pastga
            </button>
          </div>
        </div>
      </section>

      {/* CLOSING - Dark premium */}
      <section id="closing" className="relative bg-[#050505] text-white min-h-[85vh] flex flex-col items-center justify-center px-6 py-24 overflow-hidden">
        {/* Subtle stars */}
        <div className="absolute inset-0">
          {Array.from({length: 50}).map((_,i) => (
            <div key={i} className="absolute w-px h-px bg-white/30 rounded-full" style={{
              left: `${(i*53)%100}%`,
              top: `${(i*79)%100}%`,
            }} />
          ))}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
        
        <div className="relative text-center w-full max-w-[520px]">
          <h2 className="font-serif text-[46px] md:text-[58px] leading-[0.9] font-light mb-8 tracking-tight">
            {g} & {b}
          </h2>
          <p className="font-serif italic text-[18px] md:text-[19px] text-white/50 mb-16 font-light">Sizni intiqlik bilan kutamiz!</p>
          
          <div className="inline-flex items-center px-8 py-4 rounded-full border border-white/[0.08] bg-white/[0.02] backdrop-blur-sm">
            <span className="font-sans text-[11px] tracking-[0.22em] text-white/40 uppercase font-light">{d} · 18:00 · {v.split(',')[0]}</span>
          </div>

          <div className="mt-24">
            <div className="flex items-center justify-center gap-2 mb-3">
              <div className="w-6 h-px bg-white/10" />
              <span className="text-[10px] text-white/15">✦</span>
              <div className="w-6 h-px bg-white/10" />
            </div>
            <p className="font-sans text-[10px] tracking-[0.35em] text-white/20 uppercase">WebInvite • O&apos;tkan Kunlar Kolleksiyasi • 2026</p>
          </div>
        </div>
      </section>
    </div>
  )
}
