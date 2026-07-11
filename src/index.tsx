import { render } from 'solid-js/web'
import App from './app/App'
import { registerPwaUpdates } from './lib/pwa'
import './styles.css'

const root = document.getElementById('root')

if (!root) {
  throw new Error('App root element was not found.')
}

render(() => <App />, root)
registerPwaUpdates()
