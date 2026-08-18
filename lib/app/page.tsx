
export default function Home(){
  return (
    <main className="min-h-screen bg-[#FFFBF5] flex items-center justify-center p-8">
      <div className="max-w-2xl text-center">
        <h1 className="text-5xl font-bold mb-4">WebInvite v2 💍</h1>
        <p className="text-xl opacity-70 mb-8">Baza tayyor! Endi shablonlarni ulaymiz.</p>
        <div className="grid grid-cols-2 gap-4 text-left bg-white p-6 rounded-2xl shadow">
          <div>✅ Supabase ulandi</div>
          <div>✅ Kategoriyalar: 10 ta</div>
          <div>✅ Shablonlar: 8 ta</div>
          <div>✅ B2B Seller tizimi</div>
        </div>
        <p className="mt-8 text-sm opacity-50">Keyingi qadam: Telegram Bot webhook</p>
      </div>
    </main>
  )
}
