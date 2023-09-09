import { useContext, useLayoutEffect, useRef } from "react"
import { MapContext, PlacesContext } from "../context"
import { Loading } from "."
import { Map } from "mapbox-gl"

export const MapView = () => {

    const { isLoading, userLocation } = useContext( PlacesContext )
    const { setMap, markers } = useContext( MapContext ) 
    const mapDiv = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        if (!isLoading) {

            const map = new Map({
                container: mapDiv.current!,
                style: 'mapbox://styles/mapbox/navigation-night-v1',
                center: userLocation,
                zoom: 14
            }).setMinZoom(10)
                // .setMaxBounds(new LngLatBounds([-27.124115,-48.835120, -26.732311,-49.291357]))
            setMap(map)
        }
    }, [isLoading])


    function onMapClick():void {
        // markers.forEach((m) => m.remove())
    }

    if (isLoading) {
        return (<Loading />)
    }

    return(
        <div 
            ref={ mapDiv } 
            onClick={onMapClick}
            style={{
                height: '100vh',
                left: 0,
                position: 'fixed',
                top: 0,
                width: '100vw'
            }}></div>
    )
}


