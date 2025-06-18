// src/app/api/exam/[id]/route.ts
import { NextResponse } from 'next/server';
import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL!, {
  ssl: { rejectUnauthorized: false },
});

// src/app/api/exam/[id]/route.ts
export async function GET(req, { params }) {
  try {
    // Cek authorization
    const authHeader = req.headers.get('authorization');
    if (!authHeader) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const token = authHeader.split('Bearer ')[1];
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Cek siswa berdasarkan token
    const siswa = (await sql`
      SELECT siswa.id, siswa.nama, siswa.nisn, peserta_sesi.sesi_id
      FROM peserta_sesi
      JOIN siswa ON siswa.id = peserta_sesi.siswa_id
      WHERE peserta_sesi.token = ${token}
      LIMIT 1
    `)[0 ];

    if (!siswa) {
      return NextResponse.json({ error: 'Siswa tidak ditemukan' }, { status: 404 });
    }

    // Mengirim sesi yang sesuai saja
    if (siswa.sesi_id.toString() !== params.id.toString()) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // Mengirim soal dan siswa yang sesuai
    // (sama seperti yang diberikan di GET yang sebelumnya)
    //...
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}



