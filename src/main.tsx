import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { MapsApp } from './MapsApp.tsx'
import mapboxgl from 'mapbox-gl'

mapboxgl.accessToken = 'pk.eyJ1IjoibGFtYXJja2l0byIsImEiOiJjbG03eXdnaGkwNDEyM2NwY2xnOHI3d2Z5In0.FuqUw-tN9FWRk7G0g88Mpw'
// mapboxgl.accessToken = process.env.MAP_TOKEN!

if (!navigator.geolocation) {
  alert('Tu navegador no tiene opción de Geolocalización.')
  throw new Error('Tu navegador no tiene opción de Geolocalización.')
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MapsApp />
  </React.StrictMode>,
)
