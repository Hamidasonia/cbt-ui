import { NextRequest, NextResponse } from 'next/server';
import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL!, {
  ssl: { rejectUnauthorized: false },
});

export async function GET(
  req: NextRequest,
  context: { params: { id: string } }
) {
  try {
    const { id } = context.params;

    // Cek Authorization header
    const authHeader = req.headers.get('authorization');
    if (!authHeader) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.split('Bearer ')[1];
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Ambil data siswa berdasarkan token
    const siswa = (
      await sql`
        SELECT siswa.id, siswa.nama, siswa.nisn, peserta_sesi.sesi_id
        FROM peserta_sesi
        JOIN siswa ON siswa.id = peserta_sesi.siswa_id
        WHERE peserta_sesi.token = ${token}
        LIMIT 1
      `
    )[0];

    if (!siswa) {
      return NextResponse.json({ error: 'Siswa tidak ditemukan' }, { status: 404 });
    }

    // Cek apakah sesi_id siswa cocok dengan params.id
    if (siswa.sesi_id.toString() !== id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // Ambil soal berdasarkan sesi_id (atau logika sesuai kebutuhan)
    const soal = await sql`
      SELECT id, pertanyaan, tipe, pilihan, jawaban
      FROM master_soal
      WHERE sesi_id = ${id}
      ORDER BY id ASC
    `;

    return NextResponse.json({
      siswa: {
        id: siswa.id,
        nama: siswa.nama,
        nisn: siswa.nisn,
        sesi_id: siswa.sesi_id,
      },
      soal,
    });
  } catch (error: any) {
    console.error('API Error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
