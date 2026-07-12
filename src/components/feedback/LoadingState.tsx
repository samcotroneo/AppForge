import { IonContent, IonPage, IonSpinner } from '@ionic/react'

function LoadingState() {
  return (
    <IonPage>
      <IonContent>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100%', padding: '32px', gap: '20px' }}>
          <IonSpinner name="crescent" style={{ color: '#e06818', width: '48px', height: '48px' }} />
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.3em', color: '#d6a960' }}>
              Loading state
            </p>
            <h2 style={{ marginTop: '8px', fontSize: '22px', fontWeight: 700, color: '#f2f0ea' }}>
              Bootstrapping the starter workspace
            </h2>
            <p style={{ marginTop: '12px', fontSize: '14px', lineHeight: 1.75, color: '#8a8c93', maxWidth: '420px' }}>
              App-level providers, local defaults, and the reference feature are initializing before the
              first screen renders.
            </p>
          </div>
        </div>
      </IonContent>
    </IonPage>
  )
}

export default LoadingState
