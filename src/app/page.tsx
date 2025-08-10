'use client';
import { useEffect, useState } from 'react'
import { useCervo } from '@/contexts/CervoProvider'

export default function Page() {
  const cervo = useCervo()
  const [priorities, setPriorities] = useState<any[]>([])

  useEffect(() => {
    cervo.getPriorities(1).then(d => setPriorities(d.priorities))
  }, [])

  return (
    <main>
      <h1>Aide‑Devoirs IA</h1>
      <p>Bienvenue ! Voici tes <b>3 priorités du jour</b> proposées par CERVO :</p>
      <ol>
        {priorities.map((p, i) => <li key={i}>{render(p)}</li>)}
      </ol>
    </main>
  )
}

function render(p:any){
  if(p.type==='review') return <>Révision : <b>{p.notion}</b> (avant {new Date(p.due).toLocaleDateString()})</>
  if(p.type==='exercise') return <>Exercice : <b>{p.notion}</b> (diffic. {p.difficulty})</>
  if(p.type==='quiz') return <>Mini‑quiz ({p.length} questions)</>
  return JSON.stringify(p)
}
