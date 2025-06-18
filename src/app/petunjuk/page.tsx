'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function PetunjukPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Cek apakah token ada di localStorage
    const token = localStorage.getItem('token');
    const siswaId = localStorage.getItem('siswaId');
    const sesiId = localStorage.getItem('sesiId');
    if (!siswaId || !sesiId || !token) {
      router.push('/login'); // Redirect ke login jika tidak punya token
      return;
    }
    setLoading(false);
  }, [router]);

  const mulaiTes = () => {
    router.push('/exam'); // misal halaman ujian ada di /exam
  };

  if (loading) {
    return <p>Memuat...</p>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#3D5AE8] to-[#010E4C] flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-xl w-3/5 p-8 text-center">
        <h1 className="text-5xl font-bold text-[#050038] mb-6">Petunjuk Pelaksanaan Tes</h1>
        <ol className="text-left text-lg text-gray-800 space-y-2 mb-6">
          <li>1. Pastikan koneksi internet Anda stabil.</li>
          <li>2. Baca setiap instruksi dengan seksama sebelum menjawab.</li>
          <li>3. Jawablah setiap soal dengan jujur sesuai yang Anda yakini.</li>
          <li>4. Waktu pengerjaan terbatas, jadi perhatikan waktu yang tersedia.</li>
          <li>5. Dilarang menutup halaman selama tes berlangsung.</li>
          <li>6. Tekan tombol "Mulai Tes" untuk memulai.</li>
        </ol>
        <button
          onClick={mulaiTes}
          className="bg-[#050038] text-gray-50 px-6 py-3 rounded-full text-lg font-semibold hover:bg-[#000044] transition w-3/5">
          Mulai Tes →
        </button>
        <p className="text-sm text-gray-700 italic mt-6">
          “Ambil napas, siapkan dirimu. Tes ini adalah langkah kecil untuk memahami dirimu lebih dalam.”<br />
          <span className="not-italic">– Selamat Mengerjakan</span>
        </p>
        <div className="mt-6">
          <div className="inline-flex items-center justify-center bg-gray-100 rounded-lg px-4 py-2">
            <img src="/logo.png" alt="QQNuansa Consultant" className="h-12 mr-2" />
          </div>
        </div>
      </div>
    </div>
  );
}

