import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ Response: 'False', Error: 'Missing IMDb ID' }, { status: 400 });
  }

  const apiKey = process.env.API_KEY;

  const res = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&i=${id}&plot=full`);
  const data = await res.json();

  return NextResponse.json(data);
}
