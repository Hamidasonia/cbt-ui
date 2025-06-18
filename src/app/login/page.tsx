'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [token, setToken] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token })
    });

    if (res.ok) {
        const data = await res.json();
      // Simpan token di localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('siswaId', data.siswa.id);
  localStorage.setItem('sesiId', data.siswa.sesi_id);

      router.push('/petunjuk'); // Redirect ke soal
    } else {
      const data = await res.json();
      setError(data.error);
    }
  } catch (err) {
    setError((err as Error).message);
  }
};



  return (
    <div className="min-h-screen bg-gradient-to-b from-[#3D5AE8] to-[#010E4C] flex items-center justify-center p-4">
      <div className="bg-gray-50 rounded-3xl shadow-xl w-3/5 p-8 grid grid-cols-2 gap-8">
        {/* Kolom 1: Form Login */}
        <div className="flex flex-col items-start justify-center">
          <h1 className="text-5xl font-semibold text-[#050038] mb-6">
            Selamat Datang di Tes Psikologi Online
          </h1>
          <p className="text-gray-500 mb-6">
            Masukkan token Anda dan temukan potensi diri Anda lebih dalam bersama QQNuansa Consultant
          </p>

          <form onSubmit={handleLogin} className="flex flex-col gap-4 w-3/5">
            <input
              type="text"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              placeholder="Masukkan kode token"
              aria-label="kode token"
              className="p-2 rounded-full border border-[#5F5C80] text-black placeholder-[#5F5C80] focus:outline-none focus:ring-2 focus:ring-[#5F5C80]"
            />

            <button
              disabled={!token}
              className="bg-[#050038] disabled:bg-gray-500 text-gray-50 px-6 py-3 rounded-full text-lg font-semibold hover:bg-[#000044] transition">
              Masukkan Token
            </button>

            {error && <p className="text-red-500 mt-4">{error}</p>}

            {/* <p className="text-sm text-gray-700 italic mt-6">
              “Ambil napas, siapkan dirimu. Tes ini adalah langkah kecil untuk memahami dirimu lebih dalam.”<br />
              <span className="not-italic">– Selamat Mengerjakan</span>
            </p> */}

            <div className="mt-6">
              <div className="inline-flex items-center justify-center bg-gray-100 rounded-lg px-4 py-2">
                <img src="/logo.png" alt="QQNuansa Consultant" className="h-12 mr-2" />
              </div>
            </div>
          </form>
        </div>

        {/* Kolom 2: Gambar */}
        <div className="flex items-center justify-center">
          {/* Ganti src sesuai gambar yang Anda inginkan */}
          <img src="/bg-login.png" alt="Login Image" className="rounded-5xl shadow-md max-w-full max-h-full object-cover" />
        </div>
      </div>
    </div>
  );
}
