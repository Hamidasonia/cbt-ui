'use client';

import { useState } from 'react';

type Question = {
  question: string;
  options: string[];
};

const questions: Question[] = Array.from({ length: 50 }, (_, i) => ({
  question: `Ini adalah pertanyaan nomor ${i + 1}. Apa jawaban yang benar?`,
  options: ['Pilihan A', 'Pilihan B', 'Pilihan C', 'Pilihan D'],
}));

export default function ExamPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(Array(50).fill(null));
  const [doubtFlags, setDoubtFlags] = useState<boolean[]>(Array(50).fill(false));

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
    if (answers[index] !== null && doubtFlags[index]) return 'bg-orange-400';
    if (answers[index] !== null) return 'bg-green-500';
    return 'bg-gray-400';
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 p-4 bg-white border-r">
        <h2 className="text-lg font-semibold mb-4 text-black">NOMOR SOAL</h2>
        <div className="grid grid-cols-5 gap-2">
          {questions.map((_, index) => (
            <button
              key={index}
              className={`w-10 h-10 rounded text-white font-bold ${getStatusColor(index)} ${
                currentIndex === index ? 'ring-2 ring-blue-500' : ''
              }`}
              onClick={() => setCurrentIndex(index)}
            >
              {index + 1}
            </button>
          ))}
        </div>
        <div className="mt-6 text-sm text-black">
          <div><span className="inline-block w-4 h-4 bg-green-500 mr-2" /> Sudah dijawab</div>
          <div><span className="inline-block w-4 h-4 bg-orange-400 mr-2" /> Ragu-ragu</div>
          <div><span className="inline-block w-4 h-4 bg-gray-400 mr-2" /> Belum dijawab</div>
        </div>
        <button className="mt-6 bg-red-500 text-white py-2 px-4 w-full rounded">
          Hentikan Ujian
        </button>
      </div>

      {/* Main */}
      <div className="flex-1 flex flex-col">
        {/* Topbar */}
        <div className="bg-blue-700 text-white px-6 py-4 flex justify-between items-center">
          <div className="text-lg font-semibold text-white">SISWA</div>
          <div className="text-white">
            Selamat datang <strong>Hamida Sonia Dewi</strong> | <button className="underline">Logout</button>
          </div>
        </div>

        {/* Soal */}
        <div className="flex-1 p-6">
          <div className="bg-white rounded shadow p-6">
            <div className="flex justify-between mb-4">
              <h3 className="text-xl font-semibold text-black">SOAL NO. {currentIndex + 1}</h3>
              <div className="text-sm bg-gray-200 px-3 py-1 rounded text-black">SISA WAKTU 01:13:23</div>
            </div>

            <p className="mb-4 text-black">{questions[currentIndex].question}</p>
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

            <div className="mt-6 flex justify-between">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                disabled={currentIndex === 0}
                onClick={() => setCurrentIndex((i) => i - 1)}
              >
                ❮ SOAL SEBELUMNYA
              </button>

              <button
                className="bg-orange-400 text-white px-4 py-2 rounded"
                onClick={toggleDoubt}
              >
                RAGU-RAGU
              </button>

              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                disabled={currentIndex === questions.length - 1}
                onClick={() => setCurrentIndex((i) => i + 1)}
              >
                SOAL SELANJUTNYA ❯
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

