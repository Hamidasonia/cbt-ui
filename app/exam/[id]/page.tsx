import { cookies } from 'next/headers';

export default async function ExamPage(context: { params: { id: string } }) {
  const cookieStore = cookies(); // Tidak perlu di-await, cukup dipanggil di server component
  const token = cookieStore.get('token')?.value;
  const { id } = context.params;

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/exam/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    // Wajib ditambahkan untuk fetch di server component
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error("Gagal mengambil data ujian.");
  }

  const data = await res.json();

  return (
    <div>
      <h1>Soal Ujian</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
