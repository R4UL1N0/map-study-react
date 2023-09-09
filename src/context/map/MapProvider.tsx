import { AnySourceData, LngLatBounds, Map, Marker, Popup } from "mapbox-gl";
import { MapContext } from "./MapContext";
import { useReducer, useContext, useEffect } from "react";
import { mapReducer } from "./mapReducer";
import { PlacesContext } from "..";
import { directionsAPI } from "../../apis";
import { DirectionResponse } from "../../interfaces/DirectionResponse";

export interface MapState {
    isMapReady: boolean;
    map?: Map,
    markers: Marker[]
}

const INITIAL_STATE: MapState = {
    isMapReady: false,
    map: undefined,
    markers: []
}

interface Props {
    children: JSX.Element | JSX.Element[]
}

export const MapProvider = ({ children }: Props) => {
    const [state, dispatch] = useReducer(mapReducer, INITIAL_STATE)
    const { places } = useContext( PlacesContext )


    useEffect(() => {
        state.markers.forEach((m) => m.remove())
        const newMarkers: Marker[] = []

        for (const place of places) {
            const [ lat, lng ] = place.center

            const m = new Marker({color: 'red'}).setLngLat([lat, lng]).addTo(state.map!)
            newMarkers.push(m)
        }

        dispatch({type: 'setMarkers', payload: newMarkers})
    }, [places])


    const setMap = (map: Map) => {

        const newPopup = new Popup().setHTML(`
            <h3>Aquí estoy</h3>
            <p>Venga visitarme!</p>
        `)

        new Marker({
            color: 'black'
        })
            .setLngLat(map.getCenter())
            .setPopup(newPopup)
            .addTo(map)

        dispatch({type: 'setMap', payload: map})
    }

    const getRouteBetweenPoints = async (start: [number, number], end: [number, number]) => {
        const resp = await directionsAPI.get<DirectionResponse>(`/${start.join(',')};${end.join(',')}`)
        const { distance, duration, geometry } = resp.data.routes[0]
        const { coordinates: coords } = geometry

        let kms = distance / 1000
        kms = Math.round( kms * 100 )
        kms /= 100

        const minutes = Math.floor( duration / 60 )
        console.log({ kms, minutes })

        const bounds = new LngLatBounds(start, start)

        for (const coord of coords) {
            const newCoord: [number, number] = [ coord[0], coord[1] ]
            bounds.extend(newCoord)
        }

        state.map?.fitBounds(bounds, {
            padding: 100
        })

        // Polyline
        const sourceData: AnySourceData = {
            type: 'geojson',
            data: {
                type: 'FeatureCollection',
                features: [
                    {
                        type: 'Feature',
                        properties: {},
                        geometry: {
                            type: 'LineString',
                            coordinates: coords
                        }
                    }
                ]
            }
        }

        if (state.map?.getSource('RouteString')) {
            state.map?.removeLayer('RouteString')
            state.map?.removeSource('RouteString')
        }

        state.map?.addSource('RouteString', sourceData)
        state.map?.addLayer({
            id: 'RouteString',
            type: 'line',
            source: 'RouteString',
            layout: {
                'line-cap': 'round',
                'line-join': 'round'
            },
            paint: {
                'line-color': 'pink',
                'line-width': 3
            }
        })
    }

    return(
        <MapContext.Provider value={{...state, setMap, getRouteBetweenPoints}}>
            { children }
        </ MapContext.Provider>
    )
}