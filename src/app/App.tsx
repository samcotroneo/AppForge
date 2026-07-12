import { useEffect, useMemo, useState } from 'react'
import { IonApp, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs } from '@ionic/react'
import { IonReactHashRouter } from '@ionic/react-router'
import { Redirect, Route } from 'react-router-dom'
import { App as KonstaApp } from 'konsta/react'
import {
  getBlockedTasks,
  onboardingChecklist,
  starterProjects,
  starterTasks,
  summarizeProjectPortfolio,
} from '../features/workbench/workspaceData'
import type { AppFoundationContext } from '../lib/bootstrap'
import { bootstrapApp } from '../lib/bootstrap'
import HomeScreen from './screens/HomeScreen'
import SettingsScreen from './screens/SettingsScreen'
import WorkspaceScreen from './screens/WorkspaceScreen'
import LoadingState from '../components/feedback/LoadingState'
import ErrorState from '../components/feedback/ErrorState'

function App() {
  const [foundation, setFoundation] = useState<AppFoundationContext | null>(null)
  const [bootStatus, setBootStatus] = useState<'loading' | 'ready' | 'error'>('loading')
  const [bootError, setBootError] = useState<string | null>(null)

  useEffect(() => {
    const run = async () => {
      setBootStatus('loading')
      setBootError(null)
      const result = await bootstrapApp()
      if (result.status === 'error') {
        setBootStatus('error')
        setBootError(result.message)
        return
      }
      setFoundation(result.context)
      setBootStatus('ready')
    }
    void run()
  }, [])

  const portfolioSummary = useMemo(() => summarizeProjectPortfolio(starterProjects), [])
  const blockedTasks = useMemo(() => getBlockedTasks(starterTasks), [])

  if (bootStatus === 'loading') {
    return (
      <KonstaApp theme="material">
        <IonApp>
          <LoadingState />
        </IonApp>
      </KonstaApp>
    )
  }

  if (bootStatus === 'error' || !foundation) {
    return (
      <KonstaApp theme="material">
        <IonApp>
          <ErrorState
            title="App bootstrap failed"
            description={bootError ?? 'The starter shell could not complete its initialization flow.'}
          >
            <button
              type="button"
              onClick={() => window.location.reload()}
              style={{ background: '#e06818', color: '#f2f0ea', border: 'none', borderRadius: '6px', padding: '8px 16px', fontWeight: 600, cursor: 'pointer' }}
            >
              Reload app
            </button>
          </ErrorState>
        </IonApp>
      </KonstaApp>
    )
  }

  return (
    <KonstaApp theme="material">
      <IonApp>
        <IonReactHashRouter>
          <IonTabs>
            <IonRouterOutlet>
              <Redirect exact from="/" to="/home" />
              <Route path="/home">
                <HomeScreen
                  projects={starterProjects}
                  summary={portfolioSummary}
                  checklist={onboardingChecklist}
                  foundation={foundation}
                  feedbackCount={foundation.feedback.items.length}
                  foundationCount={foundation.dataBoundary.adapters.length + foundation.designSystemRules.length}
                />
              </Route>
              <Route path="/workspace">
                <WorkspaceScreen
                  projects={starterProjects}
                  tasks={starterTasks}
                  dataBoundary={foundation.dataBoundary}
                />
              </Route>
              <Route path="/settings">
                <SettingsScreen
                  blockedTaskCount={blockedTasks.length}
                  foundation={foundation}
                  portfolioProjectCount={portfolioSummary.total}
                />
              </Route>
            </IonRouterOutlet>

            <IonTabBar slot="bottom">
              <IonTabButton tab="home" href="/home">
                <IonLabel>Overview</IonLabel>
              </IonTabButton>
              <IonTabButton tab="workspace" href="/workspace">
                <IonLabel>Workspace</IonLabel>
              </IonTabButton>
              <IonTabButton tab="settings" href="/settings">
                <IonLabel>Settings</IonLabel>
              </IonTabButton>
            </IonTabBar>
          </IonTabs>
        </IonReactHashRouter>
      </IonApp>
    </KonstaApp>
  )
}

export default App
