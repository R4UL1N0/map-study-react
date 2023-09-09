import { Map, Marker } from "mapbox-gl";
import { createContext } from "react";

interface MapContextProps {
    isMapReady: boolean
    map?: Map
    setMap: (map: Map) => void
    getRouteBetweenPoints: (start: [number, number], end: [number, number]) => Promise<void>
    markers: Marker[] 
}

export const MapContext = createContext({} as MapContextProps)