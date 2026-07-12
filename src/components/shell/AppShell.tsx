import type { ReactNode } from 'react'
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react'

type AppShellProps = {
  title: string
  children: ReactNode
}

function AppShell({ title, children }: AppShellProps) {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <div slot="start" style={{ display: 'flex', alignItems: 'center', gap: '8px', paddingLeft: '12px' }}>
            <img src="/appforge_emblem.png" alt="" aria-hidden="true" style={{ height: '28px', width: '28px' }} />
            <span style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.2em', color: '#d6a960' }}>
              AppForge
            </span>
          </div>
          <IonTitle>{title}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>{children}</IonContent>
    </IonPage>
  )
}

export default AppShell
