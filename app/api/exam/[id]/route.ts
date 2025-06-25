import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL!, {
  ssl: { rejectUnauthorized: false },
});

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const token = req.cookies.get('token')?.value;

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized (no token)' }, { status: 401 });
    }

    const siswa = await sql`
      SELECT siswa.id, siswa.nama, siswa.nisn, peserta_sesi.sesi_id
      FROM peserta_sesi
      JOIN siswa ON siswa.id = peserta_sesi.siswa_id
      WHERE peserta_sesi.token = ${token}
      LIMIT 1
    `;

    if (siswa.length === 0) {
      return NextResponse.json({ error: 'Siswa tidak ditemukan' }, { status: 404 });
    }

    const siswaData = siswa[0];

    if (siswaData.sesi_id.toString() !== params.id.toString()) {
      return NextResponse.json({ error: 'Forbidden (wrong session)' }, { status: 403 });
    }

    const soal = await sql`
  SELECT soal_sesi.id, soal_sesi.sesi_id, soal_sesi.master_soal_id,
         master_soal.soal_text, master_soal.nomor_soal,
         master_soal.options, master_soal.durasi_menit
  FROM soal_sesi
  JOIN master_soal ON soal_sesi.master_soal_id = master_soal.id
  WHERE soal_sesi.sesi_id = ${siswaData.sesi_id}
`;

    const formatted = soal.map((item) => ({
      id: item.id,
      question: item.soal_text,
      options: item.options.split('|'),
      nomor_soal: item.nomor_soal,
      durasi: item.durasi_menit,
    }));

    const totalDurasi = soal.reduce((acc, item) => acc + item.durasi_menit, 0);

    return NextResponse.json({
      siswa: siswaData,
      soal: formatted,
      totalDurasiMenit: totalDurasi,
    });

  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
