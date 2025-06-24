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
  body: JSON.stringify({ token }),
  credentials: 'include', // ✅ PENTING
});
    if (res.ok) {
      router.push('/petunjuk');
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
  <div className="bg-[#ffffff] rounded-3xl w-full max-w-5xl p-12 flex flex-col lg:flex-row-reverse gap-6">
    {/* Gambar di atas saat mobile, pindah ke kiri saat desktop */}
    <div className="w-full lg:w-1/2 flex justify-center items-center">
      <img
        src="/bg-login.png"
        alt="Login Image"
        className="rounded-2xl w-full max-w-sm lg:max-w-full object-cover h-auto"
      />
    </div>

    {/* Form Login */}
    <div className="w-full lg:w-1/2 flex flex-col justify-center">
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-[#050038] mb-4">
        Selamat Datang di Tes Psikologi Online
      </h1>
      <p className="text-gray-500 mb-6 text-sm md:text-base">
        Masukkan token Anda dan temukan potensi diri Anda lebih dalam bersama QQNuansa Consultant
      </p>

      <form onSubmit={handleLogin} className="flex flex-col gap-4 w-full max-w-md">
        <input
          type="text"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          placeholder="Masukkan kode token"
          aria-label="kode token"
          className="p-3 rounded-full border border-[#5F5C80] text-black placeholder-[#5F5C80] focus:outline-none focus:ring-2 focus:ring-[#5F5C80]"
        />

        <button
          disabled={!token}
          className="bg-[#050038] disabled:bg-gray-500 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-[#000044] transition">
          Masukkan Token
        </button>

        {error && <p className="text-red-500 mt-2">{error}</p>}

        <div className="mt-6">
          <div className="inline-flex items-center justify-center bg-gray-100 rounded-lg px-4 py-2">
            <img src="/logo.png" alt="QQNuansa Consultant" className="h-10" />
          </div>
        </div>
      </form>
    </div>
  </div>
</div>

  );
}
