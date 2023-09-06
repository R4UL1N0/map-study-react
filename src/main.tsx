import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { MapsApp } from './MapsApp.tsx'

if (!navigator.geolocation) {
  alert('Tu navegador no tiene opción de Geolocalización.')
  throw new Error('Tu navegador no tiene opción de Geolocalización.')
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MapsApp />
  </React.StrictMode>,
)
