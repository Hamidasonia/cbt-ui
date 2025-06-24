import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL!, {
  ssl: { rejectUnauthorized: false },
});

export async function POST(req: NextRequest) {
  try {
    const { token } = await req.json();

    if (!token) {
      return NextResponse.json({ error: 'Token harus diisi' }, { status: 400 });
    }

    // Cari siswa berdasarkan token
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

    const siswaData = siswa[0];

    // Buat response dan set cookie
    const response = NextResponse.json({ siswa: siswaData });

    response.cookies.set('token', token, {
      httpOnly: true,
      path: '/',
      maxAge: 60 * 60 * 2, // 2 jam
    });

    response.cookies.set('siswaId', siswaData.id.toString(), {
      path: '/',
      maxAge: 60 * 60 * 2,
    });

    response.cookies.set('sesiId', siswaData.sesi_id.toString(), {
      path: '/',
      maxAge: 60 * 60 * 2,
    });

    return response;

  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
