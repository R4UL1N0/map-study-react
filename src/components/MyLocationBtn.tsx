import { MapContext, PlacesContext } from "../context"
import { useContext } from 'react' 

export const MyLocationBtn = () => {
    const { map } = useContext(MapContext)
    const { userLocation } = useContext(PlacesContext)

    const onClick = () => {
        if (!map) throw new Error("Mapa no está listo!")
        if (!userLocation) throw new Error("No hay ubicación de usuario!")

        map?.flyTo({
            zoom: 14,
            center: userLocation!
        })
    }

    return(
        <button 
            className="btn btn-primary" 
            style={{
                position: 'fixed',
                bottom: '20px',
                right: '20px',
                zIndex: 999
            }}    
            onClick={onClick}
        >
            Mi Ubicación
        </button>
    )
}