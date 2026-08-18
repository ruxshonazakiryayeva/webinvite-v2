'use client'

type Props = {
  groomName: string
  brideName: string
  date: string
  venue: string
  greeting?: string
}

export default function OtkanKunlar({ groomName, brideName, date, venue, greeting }: Props){
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 md:p-6 bg-[#FEFCF8] relative overflow-hidden">
      {/* Background pattern - atlas inspired */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23D4AF37' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }} />
      
      {/* Soft gold glow */}
      <div className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-to-b from-[#D4AF37]/10 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-200px] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-t from-[#8B0000]/5 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-[440px] relative z-10">
        {/* Main card */}
        <div className="relative bg-white rounded-[24px] md:rounded-[32px] shadow-[0_20px_80px_-20px_rgba(139,0,0,0.25),0_0_0_1px_rgba(212,175,55,0.15)] overflow-hidden">
          
          {/* Top gold line with pattern */}
          <div className="h-[6px] w-full bg-gradient-to-r from-[#D4AF37] via-[#F4D03F] to-[#D4AF37] relative">
            <div className="absolute inset-0 opacity-30" style={{
              backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 10px, rgba(0,0,0,0.1) 10px, rgba(0,0,0,0.1) 11px)`
            }} />
          </div>

          {/* Corner ornaments */}
          <div className="absolute top-6 left-6 w-12 h-12 border-l-2 border-t-2 border-[#D4AF37]/40 rounded-tl-[16px] pointer-events-none" />
          <div className="absolute top-6 right-6 w-12 h-12 border-r-2 border-t-2 border-[#D4AF37]/40 rounded-tr-[16px] pointer-events-none" />
          <div className="absolute bottom-6 left-6 w-12 h-12 border-l-2 border-b-2 border-[#D4AF37]/40 rounded-bl-[16px] pointer-events-none" />
          <div className="absolute bottom-6 right-6 w-12 h-12 border-r-2 border-b-2 border-[#D4AF37]/40 rounded-br-[16px] pointer-events-none" />

          <div className="px-8 md:px-10 py-12 md:py-14">
            {/* Bismillah */}
            <div className="text-center mb-8">
              <p className="text-[11px] tracking-[0.2em] text-[#8B0000]/60 font-medium">بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ</p>
              <p className="text-[10px] tracking-widest text-[#8B0000]/40 mt-1 uppercase">Bismillahir rohmanir rohiym</p>
            </div>

            {/* Top label */}
            <div className="flex items-center justify-center gap-3 mb-10">
              <div className="h-[1px] w-8 bg-gradient-to-r from-transparent to-[#D4AF37]/50" />
              <p className="text-[10px] tracking-[0.35em] text-[#D4AF37] font-semibold uppercase">O&apos;tkan Kunlar Ruhida</p>
              <div className="h-[1px] w-8 bg-gradient-to-l from-transparent to-[#D4AF37]/50" />
            </div>

            {/* Names */}
            <div className="text-center">
              <h1 className="font-serif">
                <span className="block text-[42px] md:text-[48px] leading-[0.9] tracking-tight text-[#2C1810] font-light">
                  {groomName || 'Nurbek'}
                </span>
                <span className="flex items-center justify-center gap-4 my-5">
                  <span className="h-[1px] w-12 bg-[#D4AF37]/30" />
                  <span className="text-[28px] text-[#D4AF37] font-light italic">&</span>
                  <span className="h-[1px] w-12 bg-[#D4AF37]/30" />
                </span>
                <span className="block text-[42px] md:text-[48px] leading-[0.9] tracking-tight text-[#2C1810] font-light">
                  {brideName || 'Madina'}
                </span>
              </h1>

              {/* Ornamental divider */}
              <div className="flex items-center justify-center gap-2 mt-8 mb-8">
                <span className="w-1 h-1 rounded-full bg-[#D4AF37]/40" />
                <span className="w-8 h-[1px] bg-[#D4AF37]/20" />
                <span className="text-[#D4AF37] text-[14px]">❦</span>
                <span className="w-8 h-[1px] bg-[#D4AF37]/20" />
                <span className="w-1 h-1 rounded-full bg-[#D4AF37]/40" />
              </div>

              <p className="text-[15px] leading-relaxed text-[#5D4037]/80 max-w-[280px] mx-auto font-light italic">
                {greeting || "Ikki qalb, bir taqdir. Muhabbatimizning eng baxtli kunida sizni yonimizda ko'rishdan baxtiyormiz."}
              </p>
            </div>

            {/* Date card - premium */}
            <div className="mt-10 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/10 to-[#8B0000]/5 rounded-[20px] blur-[1px]" />
              <div className="relative bg-[#FFFEFB] border border-[#D4AF37]/20 rounded-[20px] p-[1px]">
                <div className="bg-gradient-to-b from-white to-[#FFFBF0] rounded-[19px] px-6 py-6 text-center">
                  <p className="text-[10px] tracking-[0.3em] text-[#8B0000]/50 font-semibold uppercase mb-2">To&apos;y Kuni</p>
                  <p className="text-[22px] font-serif font-medium tracking-wide text-[#2C1810]">
                    {date || '27 Sentabr, 2026'}
                  </p>
                  <p className="text-[11px] tracking-[0.15em] text-[#5D4037]/50 uppercase mt-1">Shanba • 19:00</p>
                  
                  <div className="mt-5 pt-5 border-t border-dashed border-[#D4AF37]/20">
                    <p className="text-[10px] tracking-[0.25em] text-[#8B0000]/40 uppercase mb-1">Manzil</p>
                    <p className="text-[14px] font-medium text-[#2C1810] flex items-center justify-center gap-1.5">
                      <span className="text-[#D4AF37]">📍</span> {venue || 'Samarqand, Registon Plazasi'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action buttons - premium */}
            <div className="mt-8 grid grid-cols-3 gap-3">
              <button className="group flex flex-col items-center gap-2 py-4 px-2 rounded-[16px] bg-[#2C1810] hover:bg-[#3D2318] transition-all duration-300 hover:shadow-lg hover:shadow-[#2C1810]/20 hover:-translate-y-0.5">
                <span className="w-8 h-8 rounded-full bg-white/10 group-hover:bg-white/15 flex items-center justify-center text-[16px] transition-colors">📍</span>
                <span className="text-[10px] tracking-wide text-white/90 font-medium uppercase">Xarita</span>
              </button>
              <button className="group flex flex-col items-center gap-2 py-4 px-2 rounded-[16px] bg-[#FEFCF8] border border-[#D4AF37]/20 hover:border-[#D4AF37]/40 hover:bg-white transition-all duration-300 hover:shadow-md hover:-translate-y-0.5">
                <span className="w-8 h-8 rounded-full bg-[#D4AF37]/10 group-hover:bg-[#D4AF37]/15 flex items-center justify-center text-[16px] transition-colors">💌</span>
                <span className="text-[10px] tracking-wide text-[#5D4037] font-medium uppercase">Tabrik</span>
              </button>
              <button className="group flex flex-col items-center gap-2 py-4 px-2 rounded-[16px] bg-[#FEFCF8] border border-[#D4AF37]/20 hover:border-[#D4AF37]/40 hover:bg-white transition-all duration-300 hover:shadow-md hover:-translate-y-0.5">
                <span className="w-8 h-8 rounded-full bg-[#D4AF37]/10 group-hover:bg-[#D4AF37]/15 flex items-center justify-center text-[16px] transition-colors">🎶</span>
                <span className="text-[10px] tracking-wide text-[#5D4037] font-medium uppercase">Musiqa</span>
              </button>
            </div>

            {/* Countdown hint */}
            <div className="mt-8 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#2C1810]/[0.03] border border-[#2C1810]/[0.06]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse" />
                <span className="text-[10px] tracking-[0.15em] text-[#5D4037]/60 uppercase font-medium">Tez orada ko&apos;rishamiz</span>
              </div>
            </div>
          </div>

          {/* Bottom gold line */}
          <div className="h-[6px] w-full bg-gradient-to-r from-[#8B0000] via-[#D4AF37] to-[#8B0000] opacity-80" />
        </div>

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-[10px] tracking-[0.2em] text-[#2C1810]/30 uppercase font-medium">
            WebInvite • O&apos;tkan Kunlar kolleksiyasi
          </p>
          <div className="mt-2 flex items-center justify-center gap-1.5">
            <span className="w-3 h-[1px] bg-[#2C1810]/10" />
            <span className="text-[8px] text-[#2C1810]/20">✦</span>
            <span className="w-3 h-[1px] bg-[#2C1810]/10" />
          </div>
        </div>
      </div>
    </div>
  )
}
