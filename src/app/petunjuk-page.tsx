
export default function PetunjukPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0F3E8E] to-[#002366] flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-xl max-w-2xl w-full p-8 text-center">
        <h1 className="text-3xl font-bold text-[#0F0F0F] mb-6">Petunjuk Pelaksanaan Tes</h1>
        <ol className="text-left text-lg text-gray-800 space-y-2 mb-6">
          <li>1. Pastikan koneksi internet Anda stabil.</li>
          <li>2. Baca setiap instruksi dengan seksama sebelum menjawab.</li>
          <li>3. Jawablah setiap soal dengan jujur sesuai dengan yakin.</li>
          <li>4. Waktu pengerjaan terbatas, jadi perhatikan timer yang tersedia.</li>
          <li>5. Dilarang menutup halaman selama tes berlangsung.</li>
          <li>6. Tekan tombol "Mulai Tes" untuk memulai.</li>
        </ol>
        <button className="bg-[#000066] text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-[#000044] transition">
          Mulai Tes →
        </button>
        <p className="text-sm text-gray-700 italic mt-6">
          “Ambil napas, siapkan dirimu. Tes ini adalah langkah kecil untuk memahami dirimu lebih dalam.”<br />
          <span className="not-italic">– Selamat Mengerjakan</span>
        </p>
        <div className="mt-6">
          <div className="inline-flex items-center justify-center bg-gray-100 rounded-lg px-4 py-2">
            <img src="/logo-qqnuansa.png" alt="QQNuansa Consultant" className="h-6 mr-2" />
            <div className="text-xs text-gray-700 text-left">
              <div className="font-bold">QQNuansa Consultant</div>
              <div>Pekalongan, Jawa Tengah, Indonesia</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
