'use client';

import { useEffect, useState } from 'react';

type Question = {
  id: number;
  question: string;
  options: string[];
  nomor_soal: string;
  tipe_jawaban: 'pilihan_ganda' | 'essai';
  soal_id: string;
};

export default function ExamPage() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  // const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [answers, setAnswers] = useState<(number | string | null)[]>([]);
  const [doubtFlags, setDoubtFlags] = useState<boolean[]>([]);
  const [loading, setLoading] = useState(true);
  const [siswa, setSiswa] = useState<{ nama: string } | null>(null);
  const [showNomorSoal, setShowNomorSoal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [timeLeft, setTimeLeft] = useState<number>(0); // in seconds

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const sesiId = document.cookie
          .split('; ')
          .find((row) => row.startsWith('sesiId='))
          ?.split('=')[1];

        if (!sesiId) {
          console.error('Sesi ID tidak ditemukan di cookie');
          return;
        }

        const res = await fetch(`/api/exam/${sesiId}`);
        const data = await res.json();

        if (!res.ok || !Array.isArray(data.soal)) {
          throw new Error(data.error || 'Format data tidak sesuai');
        }

        setTimeLeft(data.totalDurasiMenit * 60);

        setSiswa(data.siswa);
        setQuestions(data.soal);
        setAnswers(Array(data.soal.length).fill(null));
        setDoubtFlags(Array(data.soal.length).fill(false));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  //   useEffect(() => {
  //   if (timeLeft <= 0) {
  //     // Waktu habis → redirect otomatis
  //     window.location.href = '/petunjuk';
  //     return;
  //   }

  //   const timer = setInterval(() => {
  //     setTimeLeft((prev) => prev - 1);
  //   }, 1000);

  //   return () => clearInterval(timer);
  // }, [timeLeft]);


  const handleSelect = (optIndex: number) => {
    const updated = [...answers];
    updated[currentIndex] = optIndex;
    setAnswers(updated);
  };

  const toggleDoubt = () => {
    const updated = [...doubtFlags];
    updated[currentIndex] = !updated[currentIndex];
    setDoubtFlags(updated);
  };

  const getStatusColor = (index: number) => {
    if (answers[index] !== null && doubtFlags[index]) return 'bg-yellow-400';
    if (answers[index] !== null) return 'bg-blue-600';
    return 'bg-gray-300';
  };

  function formatTime(seconds: number) {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  }


  if (loading) return <div className="p-10 text-black">Memuat soal...</div>;
  if (!questions.length) return <div className="p-10 text-black">Tidak ada soal ditemukan.</div>;

  return (
    <div className="flex flex-col min-h-screen">
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* Background Overlay */}
          <div
            className="absolute inset-0 bg-black opacity-40"
            onClick={() => setShowModal(false)}
          ></div>

          {/* Modal Box */}
          <div className="relative bg-white rounded-md p-6 shadow-lg w-[90%] max-w-md text-center z-10 border border-gray-300">
            <h2 className="text-lg font-bold text-black mb-2">
              Apakah Anda yakin ingin menyelesaikan tes ini?
            </h2>
            <p className="text-sm text-gray-700 mb-4">
              <strong>Pastikan semua jawaban sudah terjawab.</strong><br />
              Setelah mengklik tombol <strong>"Selesai"</strong>, Anda tidak bisa mengubah jawaban lagi.
            </p>
            <div className="flex justify-center gap-4 mt-4">
              <button
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                onClick={() => setShowModal(false)}
              >
                ❮ Kembali
              </button>
              <button
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                onClick={async () => {
                  const sesiId = document.cookie
                    .split('; ')
                    .find((row) => row.startsWith('sesiId='))
                    ?.split('=')[1];

                  if (!sesiId) return alert('Sesi ID tidak ditemukan');

                  const jawabanPayload = questions.map((q, index) => ({
                    soal_sesi_id: q.soal_id,
                    jawaban_index: answers[index], // untuk pilihan ganda
                    jawaban_text: null, // bisa diganti jika ada tipe esai
                  }));

                  const res = await fetch('/api/jawaban/submit', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                      sesi_id: sesiId,
                      jawaban: jawabanPayload,
                    }),
                  });

                  if (res.ok) {
                    window.location.href = '/selesai';
                  } else {
                    const err = await res.json();
                    alert('Gagal menyimpan jawaban: ' + err.error);
                  }
                }}
              >
                ✔ Selesai
              </button>

            </div>
          </div>
        </div>
      )}

      {/* AppBar atas */}
      <div className="bg-[#050038] text-white px-6 py-4 flex justify-between items-center w-full">
        <div className="text-lg font-light">QQNuansa <span className="font-bold">Consultant</span></div>
        <div>
          Halo, <strong>{siswa?.nama}</strong> |{' '}
          <button
            onClick={async () => {
              await fetch('/api/auth/logout', { method: 'POST' });
              window.location.href = '/login';
            }}
            className="underline"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Body utama */}
      <div className="flex flex-1 flex-col md:flex-row px-2 md:px-4 py-4 gap-4 bg-[#D9D9D9]">
        {/* Sidebar kiri */}
        <div className="w-full md:w-64 p-4 bg-white rounded">
          <p className="font-semibold text-gray-700 mb-1 text-center">Waktu Tes</p>
          <div className="bg-white border-2 border-gray-300 rounded p-4 text-center mb-4">
            <div className="font-mono text-2xl bg-white text-black py-2 rounded">{formatTime(timeLeft)}</div>
          </div>

          {/* Tombol Cek Soal hanya muncul di mobile */}
          <div className="md:hidden text-center mb-4">
            <button
              onClick={() => setShowNomorSoal(!showNomorSoal)}
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              {showNomorSoal ? 'Sembunyikan' : 'Cek Soal'}
            </button>
          </div>

          {/* Nomor Soal: sembunyi di mobile kalau belum dibuka */}
          {(showNomorSoal || typeof window !== 'undefined' && window.innerWidth >= 768) && (
            <>
              <h2 className="text-md font-semibold mb-2 text-black">Nomor Soal</h2>
              <div className="grid grid-cols-5 gap-2">
                {questions.map((_, index) => (
                  <button
                    key={index}
                    className={`w-8 h-8 rounded text-white text-sm font-bold ${getStatusColor(index)} ${currentIndex === index ? 'ring-2 ring-blue-500' : ''}`}
                    onClick={() => setCurrentIndex(index)}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>

              <div className="mt-4 text-xs text-black space-y-1">
                <div><span className="inline-block w-3 h-3 bg-green-500 mr-2 rounded-sm" /> Sudah Dijawab</div>
                <div><span className="inline-block w-3 h-3 bg-orange-400 mr-2 rounded-sm" /> Ragu-ragu</div>
                <div><span className="inline-block w-3 h-3 bg-gray-400 mr-2 rounded-sm" /> Belum Dijawab</div>
              </div>
            </>
          )}
        </div>

        {/* Konten soal */}
        <div className="flex-1">
          {/* Container judul */}
          <div className="bg-[#050038] text-white text-center py-3 rounded-t-md">
            <h2 className="text-lg font-semibold">Soal Ujian</h2>
          </div>

          <div className="bg-white rounded shadow p-6">
            <div className="flex justify-between mb-4">
              <h3 className="text-lg font-semibold text-black">
                Soal No. {questions[currentIndex].nomor_soal}
              </h3>
              <div className="text-sm bg-gray-200 px-3 py-1 rounded text-black font-mono">
                SISA WAKTU {formatTime(timeLeft)}
              </div>
            </div>

            <p className="mb-4 text-black">{questions[currentIndex].question}</p>

            {questions[currentIndex].tipe_jawaban === 'pilihan_ganda' ? (
              <div className="space-y-3">
                {questions[currentIndex].options.map((opt, i) => (
                  <label key={i} className="flex items-center space-x-2 text-black">
                    <input
                      type="radio"
                      name={`question-${currentIndex}`}
                      checked={answers[currentIndex] === i}
                      onChange={() => handleSelect(i)}
                    />
                    <span>{opt}</span>
                  </label>
                ))}
              </div>
            ) : (
              <textarea
                value={(answers[currentIndex] as string) || ''}
                onChange={(e) => {
                  const updated = [...answers];
                  updated[currentIndex] = e.target.value;
                  setAnswers(updated);
                }}
                rows={4}
                className="w-full border border-gray-300 p-2 rounded text-black"
                placeholder="Tulis jawaban esai Anda di sini..."
              />
            )}


            <div className="mt-6 flex justify-between gap-2 flex-wrap">
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded disabled:bg-blue-300"
                disabled={currentIndex === 0}
                onClick={() => setCurrentIndex((i) => i - 1)}
              >
                ❮ Soal Sebelumnya
              </button>

              <button
                className="bg-yellow-400 text-black px-4 py-2 rounded"
                onClick={toggleDoubt}
              >
                Ragu-Ragu
              </button>

              {currentIndex === questions.length - 1 ? (
                <button
                  className="bg-green-600 text-white px-4 py-2 rounded"
                  onClick={() => setShowModal(true)}
                >
                  Selesai ❯
                </button>
              ) : (
                <button
                  className="bg-blue-600 text-white px-4 py-2 rounded disabled:bg-blue-300"
                  onClick={() => setCurrentIndex((i) => i + 1)}
                >
                  Soal Selanjutnya ❯
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>

  );
}
