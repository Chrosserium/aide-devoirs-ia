import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { user_id, subject_id } = await req.json()
  // Réponse de démonstration : 1 révision (fictive), 1 exercice et 1 mini‑quiz
  const payload = {
    priorities: [
      { type: 'review', notion: 'FRACTIONS.ADD', due: new Date(Date.now()+86400000).toISOString() },
      { type: 'exercise', notion: 'FRACTIONS.SIMPLIFY', difficulty: 2 },
      { type: 'quiz', length: 5 }
    ],
    explain: 'Démo: révision due + consolidation des fractions'
  }
  return NextResponse.json(payload)
}
