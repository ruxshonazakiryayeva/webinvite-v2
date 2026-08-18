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
    <div className="min-h-screen bg-[#FDF8F0] text-[#5D4037] flex flex-col items-center p-4" style={{fontFamily: 'serif'}}>
      <div className="max-w-[420px] w-full bg-white rounded-[32px] shadow-2xl overflow-hidden border border-[#D4AF37]/30">
        {/* Header with atlas pattern */}
        <div className="h-3 bg-gradient-to-r from-[#D4AF37] via-[#8B0000] to-[#D4AF37]" />
        <div className="p-8 text-center">
          <p className="text-[#D4AF37] tracking-[0.3em] text-xs mb-6">OTKAN KUNLAR RUHIDA</p>
          <h1 className="text-4xl font-bold leading-tight">
            <span className="block">{groomName || 'Otabek'}</span>
            <span className="text-[#D4AF37] text-2xl">&</span>
            <span className="block">{brideName || 'Kumush'}</span>
          </h1>
          <p className="mt-6 text-sm opacity-70">{greeting || "Sizni toyimizga taklif etamiz"}</p>
          <div className="mt-8 p-4 bg-[#FDF8F0] rounded-2xl border border-dashed border-[#D4AF37]/30">
            <p className="text-xs tracking-widest">SANA</p>
            <p className="font-bold text-lg mt-1">{date || '12 Sentabr, 2026'}</p>
            <p className="text-xs mt-2">{venue || 'Samarqand, Registon'}</p>
          </div>
          <div className="mt-8 flex justify-center gap-2">
            <div className="w-12 h-12 rounded-full bg-[#D4AF37]/20 flex items-center justify-center">📍</div>
            <div className="w-12 h-12 rounded-full bg-[#D4AF37]/20 flex items-center justify-center">💌</div>
            <div className="w-12 h-12 rounded-full bg-[#D4AF37]/20 flex items-center justify-center">🎶</div>
          </div>
        </div>
        <div className="h-3 bg-gradient-to-r from-[#D4AF37] via-[#8B0000] to-[#D4AF37]" />
      </div>
      <p className="mt-4 text-xs opacity-40">WebInvite - Otkan kunlar shabloni</p>
    </div>
  )
}
