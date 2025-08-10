import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const data = [{ decision: 'demo', why: 'Exemple d’explication de décision CERVO' }]
  return NextResponse.json(data)
}
