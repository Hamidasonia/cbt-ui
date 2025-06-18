// src/app/api/auth/login/route.ts
import { NextResponse } from 'next/server';
import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL!, {
  ssl: { rejectUnauthorized: false },
});

// API untuk login berdasarkan token siswa
export async function POST(req) {
  try {
    const { token } = await req.json();

    if (!token) {
      return NextResponse.json({ error: 'Token harus diisi' }, { status: 400 });
    }

    // Cek siswa berdasarkan token
    const siswa = await sql`
      SELECT siswa.id, siswa.nama, siswa.nisn, peserta_sesi.sesi_id
      FROM peserta_sesi
      JOIN siswa ON siswa.id = peserta_sesi.siswa_id
      WHERE peserta_sesi.token = ${token}
      LIMIT 1
    `;

    if (siswa.length === 0) {
      return NextResponse.json({ error: 'Token tidak ditemukan' }, { status: 404 });
    }

    return NextResponse.json({ siswa: siswa[0] });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
