import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL!, {
  ssl: { rejectUnauthorized: false },
});

export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get('token')?.value;
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized (no token)' }, { status: 401 });
    }

    const data = await req.json();
    const { sesi_id, jawaban } = data; // jawaban: array of { soal_id, jawaban_index, jawaban_text }

    // Ambil siswa_id dari token
    const peserta = await sql`
  SELECT siswa_id FROM peserta_sesi
  WHERE token = ${token} AND sesi_id = ${sesi_id}
`;


    if (peserta.length === 0) {
      return NextResponse.json({ error: 'Peserta tidak ditemukan' }, { status: 404 });
    }

    const siswa_id = peserta[0].siswa_id;

    // Simpan semua jawaban
    for (const item of jawaban) {
      await sql`
        INSERT INTO jawaban_siswa (siswa_id, sesi_id, soal_sesi_id, jawaban_index, jawaban_text)
        VALUES (${siswa_id}, ${sesi_id}, ${item.soal_sesi_id}, ${item.jawaban_index}, ${item.jawaban_text})
        ON CONFLICT (siswa_id, sesi_id, soal_sesi_id) DO UPDATE
        SET jawaban_index = EXCLUDED.jawaban_index,
            jawaban_text = EXCLUDED.jawaban_text;
      `;
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('❌ Error menyimpan jawaban:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
