'use client';
import { createContext, useContext, useEffect, useMemo } from 'react'

type User = { id: string; plan: string; role: string }
type Priority = { type: string; notion?: string; difficulty?: number; due?: string; length?: number }

interface CervoCtx {
  getPriorities: (subjectId?: number) => Promise<{ priorities: Priority[] }>
  sendEvent: (kind: string, payload: any) => Promise<void>
  explain: () => Promise<any>
}

const Ctx = createContext<CervoCtx | null>(null)

export function useCervo() {
  const v = useContext(Ctx)
  if (!v) throw new Error('useCervo doit être utilisé dans <CervoProvider>')
  return v
}

export default function CervoProvider({ user, children }: { user: User; children: any }) {
  const api = useMemo(() => ({
    async getPriorities(subjectId?: number) {
      const res = await fetch('/api/cervo/next-activities', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ user_id: user.id, subject_id: subjectId }) })
      if(!res.ok) throw new Error('CERVO: next-activities a échoué')
      return res.json()
    },
    async sendEvent(kind: string, payload: any) {
      await fetch('/api/webhooks/event', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ kind, ...payload }) })
    },
    async explain() {
      const res = await fetch(`/api/cervo/explain?user=${user.id}`)
      return res.json()
    }
  }), [user.id])

  useEffect(() => { api.sendEvent('session_start', { plan: user.plan, role: user.role }) }, [])

  return <Ctx.Provider value={api}>{children}</Ctx.Provider>
}
