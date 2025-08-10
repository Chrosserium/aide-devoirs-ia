import type { Metadata } from 'next'
import './globals.css'
import CervoProvider from '@/contexts/CervoProvider'
import { headers } from 'next/headers'

export const metadata: Metadata = {
  title: 'Aide-Devoirs IA',
  description: 'Apprentissage guidé avec Lior, S.A.P.C.E. et CERVO',
}

function getFakeSession() {
  // Remplacer par une vraie session/auth plus tard
  return { user: { id: 'demo-user', plan: 'trial', role: 'student' } }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const session = getFakeSession()
  return (
    <html lang="fr">
      <body>
        <CervoProvider user={session.user}>
          {children}
        </CervoProvider>
      </body>
    </html>
  )
}
