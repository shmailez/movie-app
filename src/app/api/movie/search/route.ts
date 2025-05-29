import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get('q');
  const page = searchParams.get('page') || '1';

  if (!query) {
    return NextResponse.json({ Response: 'False', Error: 'Missing search query' }, { status: 400 });
  }

  const apiKey = process.env.API_KEY;

  const res = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=${query}&page=${page}`);
  const data = await res.json();

  return NextResponse.json(data);
}