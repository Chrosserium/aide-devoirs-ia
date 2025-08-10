import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  // Ici on accepterait l’événement et on l’enverrait en base (à brancher plus tard).
  return NextResponse.json({ ok: true })
}
