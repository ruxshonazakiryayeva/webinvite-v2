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
  
  useEffect(() => {
    const targetDate = new Date(date || '2026-09-27').getTime()
    const interval = setInterval(() => {
      const now = new Date().getTime()
      const diff = targetDate - now
      if(diff > 0){
        setTimeLeft({
          days: Math.floor(diff / (1000*60*60*24)),
          hours: Math.floor((diff % (1000*60*60*24)) / (1000*60*60)),
          minutes: Math.floor((diff % (1000*60*60)) / (1000*60)),
          seconds: Math.floor((diff % (1000*60)) / 1000)
        })
      }
    }, 1000)
    return () => clearInterval(interval)
  }, [date])

  const g = groomName || 'Otabek'
  const b = brideName || 'Kumush'
  const d = date || '27.07.2027'
  const v = venue || "Marg'ilon restorani, Farg'ona"

  return (
    <div className="w-full bg-[#0A0A0A] text-white overflow-x-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600&family=Montserrat:wght@300;400;500&display=swap');
        .font-serif { font-family: 'Cormorant Garamond', serif; }
        .font-sans { font-family: 'Montserrat', sans-serif; }
        .text-gold { color: #D4AF37; }
        .bg-gold { background-color: #D4AF37; }
        .border-gold { border-color: #D4AF37; }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        @keyframes stars { 0%{opacity:0.2} 50%{opacity:0.8} 100%{opacity:0.2} }
      `}</style>

      {/* SECTION 1 - HERO - Yulduzlar */}
      <section className="min-h-screen relative flex flex-col items-center justify-center px-6 py-20 overflow-hidden">
        {/* Starry background */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0F0F1A] via-[#12121F] to-[#0A0A0A]" />
        <div className="absolute inset-0">
          {[...Array(80)].map((_,i) => (
            <div key={i} className="absolute w-[2px] h-[2px] bg-white rounded-full" style={{
              left: `${Math.random()*100}%`,
              top: `${Math.random()*60}%`,
              animation: `stars ${2+Math.random()*3}s infinite`,
              animationDelay: `${Math.random()*3}s`,
              opacity: 0.3 + Math.random()*0.7
            }} />
          ))}
        </div>
        {/* Gold glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#D4AF37]/[0.07] rounded-full blur-[120px] pointer-events-none" />

        <div className="relative z-10 text-center">
          <p className="font-sans text-[11px] tracking-[0.4em] text-white/50 uppercase mb-8">Yulduzlar to&apos;la osmon ostida</p>
          
          <div className="mb-10">
            <p className="font-serif text-[18px] md:text-[22px] tracking-widest text-[#D4AF37] font-light">{d}</p>
            <div className="w-12 h-[1px] bg-[#D4AF37]/30 mx-auto my-4" />
            <p className="font-sans text-[12px] tracking-[0.2em] text-white/60 uppercase">{v}</p>
          </div>

          <div className="w-px h-16 bg-gradient-to-b from-[#D4AF37]/50 to-transparent mx-auto mb-8" />
          
          <button onClick={()=>document.getElementById('invitation')?.scrollIntoView({behavior:'smooth'})} className="group flex flex-col items-center gap-3 mx-auto">
            <span className="font-sans text-[10px] tracking-[0.3em] text-white/40 group-hover:text-white/70 transition-colors uppercase">Pastga</span>
            <span className="w-6 h-6 rounded-full border border-white/20 flex items-center justify-center group-hover:border-[#D4AF37]/50 transition-colors">
              <span className="text-[10px]">↓</span>
            </span>
          </button>
        </div>
      </section>

      {/* SECTION 2 - AZIZ MEHMONIMIZ */}
      <section id="invitation" className="min-h-screen bg-[#FEFCF8] text-[#1A1A1A] flex flex-col items-center justify-center px-6 py-24 relative">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#D4AF37]/20 to-transparent" />
        
        <div className="max-w-[480px] w-full text-center">
          <p className="font-sans text-[11px] tracking-[0.35em] text-[#8B0000]/60 uppercase mb-12">— Aziz mehmonimiz —</p>
          
          <div className="mb-10">
            <p className="font-serif text-[16px] leading-relaxed text-[#1A1A1A]/70 font-light">
              {greeting || "Farzandlarimizning nikoh to'yi munosabati bilan sizni to'y oqshomiga lutfan taklif etamiz."}
            </p>
          </div>

          <h1 className="font-serif text-[44px] md:text-[52px] leading-[0.9] font-light tracking-tight mb-12">
            <span className="block">{g}</span>
            <span className="block text-[28px] text-[#D4AF37] font-light my-2 italic">&</span>
            <span className="block">{b}</span>
          </h1>

          <div className="flex items-center justify-center gap-2 mb-12">
            <span className="w-1 h-1 bg-[#D4AF37]/40 rounded-full" />
            <span className="w-12 h-px bg-[#D4AF37]/20" />
            <span className="text-[#D4AF37] text-[16px]">❦</span>
            <span className="w-12 h-px bg-[#D4AF37]/20" />
            <span className="w-1 h-1 bg-[#D4AF37]/40 rounded-full" />
          </div>

          <button onClick={()=>document.getElementById('story')?.scrollIntoView({behavior:'smooth'})} className="font-sans text-[10px] tracking-[0.3em] text-[#1A1A1A]/30 hover:text-[#1A1A1A]/60 transition-colors uppercase">Pastga</button>
        </div>
      </section>

      {/* SECTION 3 - BIZNING HIKOYAMIZ */}
      <section id="story" className="min-h-screen bg-[#0F0F0F] text-white flex flex-col items-center justify-center px-6 py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] to-[#151515]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#D4AF37]/[0.03] rounded-full blur-[100px]" />
        
        <div className="relative max-w-[520px] w-full text-center">
          <h2 className="font-serif text-[32px] md:text-[36px] font-light mb-10 tracking-wide">Bizning hikoyamiz</h2>
          
          <div className="space-y-6 font-serif text-[17px] leading-relaxed text-white/70 font-light">
            <p>Ikki qalbning uchrashuvi taqdir inoyati.</p>
            <p>Ularning muhabbati sinovlardan o&apos;tib, sabr, ishonch va hurmat bilan yanada mustahkam bo&apos;ldi.</p>
            <p>Endi esa bu yo&apos;l — bir umr davom etuvchi baxt yo&apos;liga aylanadi.</p>
          </div>

          <div className="mt-12 py-6 border-y border-white/10">
            <p className="font-serif italic text-[16px] text-[#D4AF37]/80">&quot;Sevgi — sabr bilan go&apos;zal, vafo bilan abadiy bo&apos;lur.&quot;</p>
          </div>

          <button onClick={()=>document.getElementById('event')?.scrollIntoView({behavior:'smooth'})} className="mt-12 font-sans text-[10px] tracking-[0.3em] text-white/30 hover:text-white/60 transition-colors uppercase">Pastga</button>
        </div>
      </section>

      {/* SECTION 4 - TO'Y MAROSIMI */}
      <section id="event" className="min-h-screen bg-[#FEFCF8] text-[#1A1A1A] flex flex-col items-center justify-center px-6 py-24">
        <div className="max-w-[440px] w-full">
          <h2 className="font-serif text-[28px] font-light tracking-[0.15em] text-center mb-16 uppercase">To&apos;y Marosimi</h2>
          
          <div className="space-y-10">
            <div className="flex justify-between items-start border-b border-[#1A1A1A]/10 pb-6">
              <span className="font-sans text-[11px] tracking-[0.2em] text-[#1A1A1A]/40 uppercase">Sana</span>
              <span className="font-serif text-[18px]">{d}, Seshanba</span>
            </div>
            <div className="flex justify-between items-start border-b border-[#1A1A1A]/10 pb-6">
              <span className="font-sans text-[11px] tracking-[0.2em] text-[#1A1A1A]/40 uppercase">Vaqt</span>
              <span className="font-serif text-[18px]">18:00</span>
            </div>
            <div className="flex justify-between items-start">
              <span className="font-sans text-[11px] tracking-[0.2em] text-[#1A1A1A]/40 uppercase">Manzil</span>
              <span className="font-serif text-[18px] text-right max-w-[220px]">{v}</span>
            </div>
          </div>

          <a href={`https://yandex.uz/maps/?text=${encodeURIComponent(v)}`} target="_blank" className="mt-12 w-full bg-[#1A1A1A] text-white py-4 rounded-full font-sans text-[11px] tracking-[0.2em] uppercase flex items-center justify-center gap-2 hover:bg-black transition-colors">
            <span>📍</span> Xaritada ochish
          </a>

          <button onClick={()=>document.getElementById('countdown')?.scrollIntoView({behavior:'smooth'})} className="mt-10 w-full text-center font-sans text-[10px] tracking-[0.3em] text-[#1A1A1A]/30 hover:text-[#1A1A1A]/60 transition-colors uppercase">Pastga</button>
        </div>
      </section>

      {/* SECTION 5 - COUNTDOWN */}
      <section id="countdown" className="min-h-[70vh] bg-[#0A0A0A] text-white flex flex-col items-center justify-center px-6 py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0F0F0F] to-[#0A0A0A]" />
        <div className="relative max-w-[500px] w-full text-center">
          <h2 className="font-serif text-[24px] font-light tracking-[0.2em] uppercase mb-16">To&apos;yga qancha qoldi?</h2>
          
          <div className="grid grid-cols-4 gap-4 md:gap-8">
            {[
              { label: 'Kun', value: timeLeft.days },
              { label: 'Soat', value: timeLeft.hours },
              { label: 'Daqiqa', value: timeLeft.minutes },
              { label: 'Soniya', value: timeLeft.seconds },
            ].map((item) => (
              <div key={item.label} className="text-center">
                <div className="font-serif text-[36px] md:text-[48px] font-light leading-none">{String(item.value).padStart(2,'0')}</div>
                <div className="font-sans text-[10px] tracking-[0.2em] text-white/40 uppercase mt-2">{item.label}</div>
              </div>
            ))}
          </div>

          <button onClick={()=>document.getElementById('rsvp')?.scrollIntoView({behavior:'smooth'})} className="mt-16 font-sans text-[10px] tracking-[0.3em] text-white/30 hover:text-white/60 transition-colors uppercase">Pastga</button>
        </div>
      </section>

      {/* SECTION 6 - RSVP */}
      <section id="rsvp" className="min-h-screen bg-[#FEFCF8] text-[#1A1A1A] flex flex-col items-center justify-center px-6 py-24">
        <div className="max-w-[440px] w-full">
          <h2 className="font-serif text-[28px] font-light tracking-wide text-center mb-3">Mehmon tasdiqlash</h2>
          <p className="font-sans text-[13px] text-center text-[#1A1A1A]/50 mb-10">Iltimos, ishtirokingizni bizga ma&apos;lum qiling.</p>
          
          <div className="space-y-4">
            <input placeholder="Ismingiz" className="w-full px-6 py-4 rounded-full border border-[#1A1A1A]/10 bg-white font-sans text-[14px] outline-none focus:border-[#D4AF37]/50 transition-colors" />
            <select className="w-full px-6 py-4 rounded-full border border-[#1A1A1A]/10 bg-white font-sans text-[14px] outline-none focus:border-[#D4AF37]/50 transition-colors">
              <option>Ha, kelaman</option>
              <option>Kelolmayman</option>
            </select>
            <textarea placeholder="Tabrik so'zlaringiz..." rows={4} className="w-full px-6 py-4 rounded-[24px] border border-[#1A1A1A]/10 bg-white font-sans text-[14px] outline-none focus:border-[#D4AF37]/50 transition-colors resize-none" />
            <button className="w-full bg-[#1A1A1A] text-white py-4 rounded-full font-sans text-[11px] tracking-[0.2em] uppercase hover:bg-black transition-colors">
              Tasdiqlash yuborish
            </button>
          </div>

          <button onClick={()=>document.getElementById('closing')?.scrollIntoView({behavior:'smooth'})} className="mt-10 w-full text-center font-sans text-[10px] tracking-[0.3em] text-[#1A1A1A]/30 hover:text-[#1A1A1A]/60 transition-colors uppercase">Pastga</button>
        </div>
      </section>

      {/* SECTION 7 - CLOSING */}
      <section id="closing" className="min-h-[80vh] bg-[#0A0A0A] text-white flex flex-col items-center justify-center px-6 py-24 relative overflow-hidden">
        <div className="absolute inset-0">
          {[...Array(40)].map((_,i) => (
            <div key={i} className="absolute w-[1px] h-[1px] bg-white rounded-full opacity-30" style={{
              left: `${Math.random()*100}%`,
              top: `${Math.random()*100}%`,
            }} />
          ))}
        </div>
        
        <div className="relative text-center">
          <h2 className="font-serif text-[42px] md:text-[52px] leading-[0.9] font-light mb-6">
            {g} & {b}
          </h2>
          <p className="font-serif italic text-[16px] text-white/60 mb-12">Sizni intiqlik bilan kutamiz!</p>
          
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-white/10">
            <span className="font-sans text-[11px] tracking-[0.2em] text-white/50 uppercase">{d} · 18:00 · {v.split(',')[0]}</span>
          </div>

          <div className="mt-16">
            <p className="font-sans text-[9px] tracking-[0.3em] text-white/20 uppercase">WebInvite • O&apos;tkan Kunlar</p>
          </div>
        </div>
      </section>
    </div>
  )
}
