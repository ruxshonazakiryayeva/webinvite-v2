'use client'
import { useEffect, useState, useRef } from 'react'

type Props = {
  groomName: string
  brideName: string
  date: string
  venue: string
  greeting?: string
}

type Lang = 'uz' | 'ru' | 'en'

const translations = {
  uz: {
    stars: "Yulduzlar to'la osmon ostida",
    dear: "— Aziz mehmonimiz —",
    invitation: "Farzandlarimizning nikoh to'yi munosabati bilan sizni to'y oqshomiga lutfan taklif etamiz.",
    storyTitle: "Bizning hikoyamiz",
    story1: "Ikki qalbning uchrashuvi taqdir inoyati.",
    story2: "Ularning muhabbati sinovlardan o'tib, sabr, ishonch va hurmat bilan yanada mustahkam bo'ldi.",
    story3: "Endi esa bu yo'l — bir umr davom etuvchi baxt yo'liga aylanadi.",
    quote: "Sevgi — sabr bilan go'zal, vafo bilan abadiy bo'lur.",
    event: "To'y Marosimi",
    dateLabel: "Sana",
    timeLabel: "Vaqt",
    venueLabel: "Manzil",
    time: "18:00",
    openMap: "Xaritada ochish",
    gallery: "Galereya",
    countdown: "To'yga qancha qoldi?",
    days: "Kun",
    hours: "Soat",
    minutes: "Daqiqa",
    seconds: "Soniya",
    rsvpTitle: "Mehmon tasdiqlash",
    rsvpDesc: "Iltimos, ishtirokingizni bizga ma'lum qiling.",
    namePlaceholder: "Ismingiz",
    yes: "Ha, kelaman",
    no: "Kelolmayman",
    wishPlaceholder: "Tabrik so'zlaringiz...",
    send: "Tasdiqlash yuborish",
    sent: "✓ Yuborildi!",
    thanks: "Rahmat! Javobingiz qabul qilindi ❤️",
    waiting: "Sizni intiqlik bilan kutamiz!",
    down: "Pastga"
  },
  ru: {
    stars: "Под звездным небом",
    dear: "— Дорогой гость —",
    invitation: "Приглашаем Вас на торжество по случаю свадьбы наших детей.",
    storyTitle: "Наша история",
    story1: "Встреча двух сердец — это дар судьбы.",
    story2: "Их любовь прошла через испытания и стала крепче благодаря терпению, доверию и уважению.",
    story3: "Теперь этот путь превращается в дорогу счастья длиною в жизнь.",
    quote: "Любовь прекрасна терпением и вечна верностью.",
    event: "Свадебное торжество",
    dateLabel: "Дата",
    timeLabel: "Время",
    venueLabel: "Место",
    time: "18:00",
    openMap: "Открыть на карте",
    gallery: "Галерея",
    countdown: "Сколько осталось?",
    days: "Дней",
    hours: "Часов",
    minutes: "Минут",
    seconds: "Секунд",
    rsvpTitle: "Подтверждение",
    rsvpDesc: "Пожалуйста, сообщите о вашем участии.",
    namePlaceholder: "Ваше имя",
    yes: "Да, я приду",
    no: "Не смогу прийти",
    wishPlaceholder: "Ваши пожелания...",
    send: "Отправить",
    sent: "✓ Отправлено!",
    thanks: "Спасибо! Ваш ответ получен ❤️",
    waiting: "Ждем Вас с нетерпением!",
    down: "Вниз"
  },
  en: {
    stars: "Under the starry sky",
    dear: "— Dear Guest —",
    invitation: "We cordially invite you to the wedding celebration of our children.",
    storyTitle: "Our Story",
    story1: "The meeting of two hearts is a gift of fate.",
    story2: "Their love passed through trials and became stronger with patience, trust and respect.",
    story3: "Now this path turns into a road of happiness for a lifetime.",
    quote: "Love is beautiful with patience and eternal with loyalty.",
    event: "Wedding Ceremony",
    dateLabel: "Date",
    timeLabel: "Time",
    venueLabel: "Venue",
    time: "18:00",
    openMap: "Open in maps",
    gallery: "Gallery",
    countdown: "How much left?",
    days: "Days",
    hours: "Hours",
    minutes: "Minutes",
    seconds: "Seconds",
    rsvpTitle: "RSVP",
    rsvpDesc: "Please let us know about your attendance.",
    namePlaceholder: "Your name",
    yes: "Yes, I'll come",
    no: "Can't come",
    wishPlaceholder: "Your wishes...",
    send: "Send confirmation",
    sent: "✓ Sent!",
    thanks: "Thank you! Your response received ❤️",
    waiting: "We are waiting for you!",
    down: "Down"
  }
}

export default function OtkanKunlar({ groomName, brideName, date, venue, greeting }: Props){
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  const [lang, setLang] = useState<Lang>('uz')
  const [isPlaying, setIsPlaying] = useState(false)
  const [guestName, setGuestName] = useState('')
  const [attendance, setAttendance] = useState('')
  const [wish, setWish] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [selectedImg, setSelectedImg] = useState<string | null>(null)
  const audioRef = useRef<HTMLAudioElement>(null)
  
  const t = translations[lang]
  const g = groomName || 'Otabek'
  const b = brideName || 'Kumush'
  const d = date || '27.07.2027'
  const v = venue || "Marg'ilon restorani, Farg'ona"

  useEffect(() => {
    const target = new Date(date).getTime() || new Date('2027-07-27').getTime()
    const interval = setInterval(() => {
      const diff = target - new Date().getTime()
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

  useEffect(() => {
    setAttendance(t.yes)
  }, [lang, t.yes])

  const toggleMusic = () => {
    if(audioRef.current){
      if(isPlaying){
        audioRef.current.pause()
      } else {
        audioRef.current.play().catch(()=>{})
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleRSVP = () => {
    if(!guestName.trim()) return alert(lang==='uz'?'Ismingizni kiriting': lang==='ru'?'Введите имя':'Enter name')
    setSubmitted(true)
    setTimeout(()=> setSubmitted(false), 4000)
    setGuestName('')
    setWish('')
  }

  const galleryImages = [
    'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800',
    'https://images.unsplash.com/photo-1519741497674-611481863552?w=800',
    'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800',
    'https://images.unsplash.com/photo-1520854221256-17451ccdf07b?w=800',
    'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800',
    'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800',
  ]

  return (
    <div className="w-full bg-[#080810] text-white">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600&family=Manrope:wght@300;400;500&display=swap');
        .font-serif { font-family: 'Cormorant Garamond', serif; }
        .font-sans { font-family: 'Manrope', sans-serif; }
        @keyframes twinkle { 0%,100%{opacity:0.2} 50%{opacity:1} }
        @keyframes spin-slow { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
      `}</style>

      {/* Audio */}
      <audio ref={audioRef} loop preload="none" src="https://cdn.pixabay.com/download/audio/2022/06/07/audio_b9bd4170e8.mp3?filename=romantic-wedding-111407.mp3" />

      {/* Fixed controls - Lang + Music - like your repo */}
      <div className="fixed top-4 right-4 z-[100] flex items-center gap-2">
        <div className="flex items-center bg-black/40 backdrop-blur-md border border-white/10 rounded-full p-1">
          {(['uz','ru','en'] as Lang[]).map((l) => (
            <button
              key={l}
              onClick={()=>setLang(l)}
              className={`px-3 py-1.5 rounded-full text-[10px] tracking-widest uppercase font-medium transition-all ${lang===l ? 'bg-white text-black' : 'text-white/60 hover:text-white'}`}
            >
              {l}
            </button>
          ))}
        </div>
        <button
          onClick={toggleMusic}
          className="w-9 h-9 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center hover:bg-black/60 transition-colors group"
        >
          <span className={`text-[14px] ${isPlaying ? 'animate-[spin-slow_3s_linear_infinite]' : ''}`}>{isPlaying ? '🎵' : '🔇'}</span>
        </button>
      </div>

      {/* HERO */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[#080810]" />
        <div className="absolute inset-0 opacity-30" style={{background: 'radial-gradient(ellipse at top, rgba(212,175,55,0.2), transparent 60%)'}} />
        <div className="absolute inset-0">
          {Array.from({length:80}).map((_,i)=>(
            <div key={i} className="absolute w-px h-px bg-white rounded-full" style={{
              left: `${(i*37)%100}%`, top: `${(i*59)%60}%`,
              animation: `twinkle ${2+i%3}s infinite`,
              animationDelay: `${i%4*0.5}s`
            }}/>
          ))}
        </div>
        <div className="relative text-center max-w-[520px] py-20">
          <p className="font-sans text-[11px] tracking-[0.45em] text-white/40 uppercase mb-16">{t.stars}</p>
          <p className="font-serif text-[24px] tracking-[0.15em] text-[#E8C15A] mb-6">{d}</p>
          <div className="flex items-center justify-center gap-3 my-6">
            <div className="w-8 h-px bg-[#D4AF37]/20"/><div className="w-1 h-1 rounded-full bg-[#D4AF37]/40"/><div className="w-8 h-px bg-[#D4AF37]/20"/>
          </div>
          <p className="font-sans text-[12px] tracking-[0.25em] text-white/50 uppercase">{v}</p>
          <button onClick={()=>document.getElementById('invitation')?.scrollIntoView({behavior:'smooth'})} className="mt-32 flex flex-col items-center gap-3 mx-auto group">
            <span className="font-sans text-[10px] tracking-[0.35em] text-white/30 group-hover:text-white/60 uppercase">{t.down}</span>
            <div className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center group-hover:border-[#D4AF37]/40">↓</div>
          </button>
        </div>
      </section>

      {/* INVITATION */}
      <section id="invitation" className="bg-[#FFFDFA] text-[#121212] py-28 px-6">
        <div className="max-w-[520px] mx-auto text-center">
          <p className="font-sans text-[11px] tracking-[0.4em] text-[#8B0000]/50 uppercase mb-14">{t.dear}</p>
          <p className="font-serif text-[18px] leading-[1.7] text-[#2A2A2A]/80 mb-16">{greeting || t.invitation}</p>
          <h1 className="font-serif text-[56px] md:text-[64px] leading-[0.85] font-light">
            <span className="block">{g}</span>
            <span className="block text-[26px] text-[#C9A84C] italic my-3">&</span>
            <span className="block">{b}</span>
          </h1>
          <div className="flex items-center justify-center gap-3 my-16">
            <div className="w-12 h-px bg-[#D4AF37]/15"/><span className="text-[#D4AF37]">❧</span><div className="w-12 h-px bg-[#D4AF37]/15"/>
          </div>
          <button onClick={()=>document.getElementById('story')?.scrollIntoView({behavior:'smooth'})} className="font-sans text-[10px] tracking-[0.35em] text-black/25 uppercase">{t.down}</button>
        </div>
      </section>

      {/* STORY */}
      <section id="story" className="bg-[#0D0D0D] text-white py-28 px-6">
        <div className="max-w-[560px] mx-auto text-center">
          <h2 className="font-serif text-[36px] font-light mb-12">{t.storyTitle}</h2>
          <div className="space-y-5 font-serif text-[18px] leading-[1.8] text-white/60 font-light">
            <p>{t.story1}</p><p>{t.story2}</p><p className="text-white/80">{t.story3}</p>
          </div>
          <div className="mt-12 pt-8 border-t border-white/10">
            <p className="font-serif italic text-[#D4AF37]/70">&quot;{t.quote}&quot;</p>
          </div>
          <button onClick={()=>document.getElementById('event')?.scrollIntoView({behavior:'smooth'})} className="mt-14 font-sans text-[10px] tracking-[0.35em] text-white/20 uppercase">{t.down}</button>
        </div>
      </section>

      {/* EVENT + MAP */}
      <section id="event" className="bg-[#FFFDFA] text-[#121212] py-28 px-6">
        <div className="max-w-[460px] mx-auto">
          <h2 className="font-serif text-[26px] tracking-[0.2em] text-center uppercase mb-16">{t.event}</h2>
          <div className="space-y-0 border-y border-black/10">
            <div className="flex justify-between py-6 border-b border-black/5"><span className="font-sans text-[11px] tracking-[0.2em] text-black/40 uppercase">{t.dateLabel}</span><span className="font-serif text-[18px]">{d}</span></div>
            <div className="flex justify-between py-6 border-b border-black/5"><span className="font-sans text-[11px] tracking-[0.2em] text-black/40 uppercase">{t.timeLabel}</span><span className="font-serif text-[18px]">{t.time}</span></div>
            <div className="flex justify-between py-6"><span className="font-sans text-[11px] tracking-[0.2em] text-black/40 uppercase">{t.venueLabel}</span><span className="font-serif text-[18px] text-right max-w-[200px]">{v}</span></div>
          </div>
          
          {/* Yandex Map Embed */}
          <div className="mt-10 rounded-[24px] overflow-hidden border border-black/10 h-[240px] bg-[#F5F1E8] relative">
            <iframe 
              src={`https://yandex.uz/map-widget/v1/?text=${encodeURIComponent(v)}&z=14`}
              className="w-full h-full border-0"
              title="Map"
            />
            <div className="absolute bottom-3 left-3 right-3 flex gap-2">
              <a href={`https://yandex.uz/maps/?text=${encodeURIComponent(v)}`} target="_blank" className="flex-1 bg-[#121212] text-white py-3 rounded-full text-[11px] tracking-widest uppercase text-center">Yandex</a>
              <a href={`https://maps.google.com/?q=${encodeURIComponent(v)}`} target="_blank" className="flex-1 bg-white border border-black/10 py-3 rounded-full text-[11px] tracking-widest uppercase text-center">Google</a>
            </div>
          </div>

          <a href={`https://yandex.uz/maps/?text=${encodeURIComponent(v)}`} target="_blank" className="mt-6 w-full bg-[#121212] text-white py-4 rounded-full text-[11px] tracking-widest uppercase flex items-center justify-center gap-2">
            📍 {t.openMap}
          </a>
          <div className="text-center mt-8">
            <button onClick={()=>document.getElementById('gallery')?.scrollIntoView({behavior:'smooth'})} className="font-sans text-[10px] tracking-[0.35em] text-black/25 uppercase">{t.down}</button>
          </div>
        </div>
      </section>

      {/* GALLERY - new feature */}
      <section id="gallery" className="bg-[#0D0D0D] text-white py-28 px-4">
        <div className="max-w-[720px] mx-auto">
          <h2 className="font-serif text-[28px] tracking-[0.2em] text-center uppercase mb-12">{t.gallery}</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {galleryImages.map((img,i)=>(
              <div key={i} className="group relative aspect-[4/5] overflow-hidden rounded-[20px] cursor-pointer bg-[#1A1A1A]" onClick={()=>setSelectedImg(img)}>
                <img src={img} alt="gallery" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy"/>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors"/>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <button onClick={()=>document.getElementById('countdown')?.scrollIntoView({behavior:'smooth'})} className="font-sans text-[10px] tracking-[0.35em] text-white/20 uppercase">{t.down}</button>
          </div>
        </div>
      </section>

      {/* COUNTDOWN */}
      <section id="countdown" className="bg-[#080808] text-white py-28 px-6">
        <div className="max-w-[560px] mx-auto text-center">
          <h2 className="font-serif text-[22px] tracking-[0.25em] uppercase mb-16">{t.countdown}</h2>
          <div className="grid grid-cols-4 gap-6">
            {[
              {l:t.days, v:timeLeft.days},
              {l:t.hours, v:timeLeft.hours},
              {l:t.minutes, v:timeLeft.minutes},
              {l:t.seconds, v:timeLeft.seconds},
            ].map((item)=>(
              <div key={item.l} className="text-center">
                <div className="font-serif text-[40px] md:text-[48px] font-light">{String(item.v).padStart(2,'0')}</div>
                <div className="font-sans text-[10px] tracking-[0.2em] text-white/30 uppercase mt-2">{item.l}</div>
              </div>
            ))}
          </div>
          <button onClick={()=>document.getElementById('rsvp')?.scrollIntoView({behavior:'smooth'})} className="mt-16 font-sans text-[10px] tracking-[0.35em] text-white/20 uppercase">{t.down}</button>
        </div>
      </section>

      {/* RSVP */}
      <section id="rsvp" className="bg-[#FFFDFA] text-[#121212] py-28 px-6">
        <div className="max-w-[440px] mx-auto">
          <h2 className="font-serif text-[30px] text-center mb-3">{t.rsvpTitle}</h2>
          <p className="font-sans text-[14px] text-center text-black/50 mb-10">{t.rsvpDesc}</p>
          <div className="space-y-4">
            <input value={guestName} onChange={e=>setGuestName(e.target.value)} placeholder={t.namePlaceholder} className="w-full px-7 py-4 rounded-full border border-black/10 bg-white text-[15px] outline-none focus:border-[#D4AF37]/40"/>
            <select value={attendance} onChange={e=>setAttendance(e.target.value)} className="w-full px-7 py-4 rounded-full border border-black/10 bg-white text-[15px] outline-none">
              <option>{t.yes}</option><option>{t.no}</option>
            </select>
            <textarea value={wish} onChange={e=>setWish(e.target.value)} placeholder={t.wishPlaceholder} rows={4} className="w-full px-7 py-5 rounded-[28px] border border-black/10 bg-white text-[15px] outline-none resize-none"/>
            <button onClick={handleRSVP} className="w-full bg-[#121212] text-white py-4 rounded-full text-[11px] tracking-widest uppercase">{submitted ? t.sent : t.send}</button>
            {submitted && <p className="text-center text-[13px] text-green-700 pt-2">{t.thanks}</p>}
          </div>
          <div className="text-center mt-10">
            <button onClick={()=>document.getElementById('closing')?.scrollIntoView({behavior:'smooth'})} className="font-sans text-[10px] tracking-[0.35em] text-black/25 uppercase">{t.down}</button>
          </div>
        </div>
      </section>

      {/* CLOSING */}
      <section id="closing" className="bg-[#050505] text-white min-h-[80vh] flex items-center justify-center px-6 py-24">
        <div className="text-center">
          <h2 className="font-serif text-[48px] md:text-[56px] leading-[0.9] mb-6">{g} & {b}</h2>
          <p className="font-serif italic text-[18px] text-white/50 mb-12">{t.waiting}</p>
          <div className="inline-flex px-8 py-3 rounded-full border border-white/10 text-[11px] tracking-widest text-white/40 uppercase">{d} · 18:00 · {v.split(',')[0]}</div>
        </div>
      </section>

      {/* Gallery modal */}
      {selectedImg && (
        <div className="fixed inset-0 z-[200] bg-black/90 flex items-center justify-center p-4" onClick={()=>setSelectedImg(null)}>
          <img src={selectedImg} alt="gallery" className="max-w-full max-h-[90vh] rounded-[16px] object-contain"/>
          <button className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 text-white flex items-center justify-center">✕</button>
        </div>
      )}
    </div>
  )
}
