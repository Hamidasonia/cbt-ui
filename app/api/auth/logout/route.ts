import { NextResponse } from 'next/server';

export async function POST() {
  const res = NextResponse.json({ message: 'Logout success' });

  res.cookies.set('token', '', { path: '/', maxAge: 0 });
  res.cookies.set('siswaId', '', { path: '/', maxAge: 0 });
  res.cookies.set('sesiId', '', { path: '/', maxAge: 0 });

  return res;
}
