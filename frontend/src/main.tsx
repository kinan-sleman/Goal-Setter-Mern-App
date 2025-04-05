import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import ProviderComponent from './redux/Provider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ProviderComponent>
      <App />
    </ProviderComponent>
  </StrictMode>,
)
