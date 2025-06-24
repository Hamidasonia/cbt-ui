'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function PetunjukPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Tidak perlu cek localStorage, validasi dilakukan via middleware
    setLoading(false);
  }, []);

  useEffect(() => {
  localStorage.setItem("exam_id", "0c2833c5-3b4d-4aed-955a-854eaf889f46"); // set ini di halaman login/petunjuk
}, []);

const mulaiTes = () => {
  const examId = localStorage.getItem("exam_id");
  if (examId) {
    router.push(`/exam/${examId}`);
  } else {
    alert("Gagal menemukan ID ujian");
  }
};


  if (loading) {
    return <p className="text-white text-center mt-10">Memuat...</p>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#3D5AE8] to-[#010E4C] flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-xl w-full max-w-3xl p-6 sm:p-8 text-center">
        <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-[#050038] mb-6">
          Petunjuk Pelaksanaan Tes
        </h1>

        <ol className="text-left text-sm sm:text-base md:text-lg text-gray-800 space-y-2 mb-6">
          <li>1. Pastikan koneksi internet Anda stabil.</li>
          <li>2. Baca setiap instruksi dengan seksama sebelum menjawab.</li>
          <li>3. Jawablah setiap soal dengan jujur sesuai yang Anda yakini.</li>
          <li>4. Waktu pengerjaan terbatas, jadi perhatikan waktu yang tersedia.</li>
          <li>5. Dilarang menutup halaman selama tes berlangsung.</li>
          <li>6. Tekan tombol "Mulai Tes" untuk memulai.</li>
        </ol>

        <button
          onClick={mulaiTes}
          className="bg-[#050038] text-white px-6 py-3 rounded-full text-base sm:text-lg font-semibold hover:bg-[#000044] transition w-full sm:w-3/5 mx-auto">
          Mulai Tes →
        </button>

        <p className="text-sm sm:text-base text-gray-700 italic mt-6">
          “Ambil napas, siapkan dirimu. Tes ini adalah langkah kecil untuk memahami dirimu lebih dalam.”<br />
          <span className="not-italic">– Selamat Mengerjakan</span>
        </p>

        <div className="mt-6">
          <div className="inline-flex items-center justify-center bg-gray-100 rounded-lg px-4 py-2">
            <img src="/logo.png" alt="QQNuansa Consultant" className="h-10 sm:h-12 mr-2" />
          </div>
        </div>
      </div>
    </div>
  );
}
