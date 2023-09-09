import { Marker } from "mapbox-gl"
import { MapContext, PlacesContext } from "../context"
import { useContext, useState } from 'react'
import { Feature } from "../interfaces/PlacesResponse"

export const SearchResults = () => {

    const {places, isLoadingPlaces, userLocation} = useContext(PlacesContext)
    const { map, getRouteBetweenPoints } = useContext(MapContext)


    const [activeId, setActiveId] = useState("")

    function onPlaceClick(place: Feature): void {
        setActiveId(place.id)
        const [ lat, lng ] = place.center
        map!.flyTo({
            center: [ lat, lng ]
        })
    }

    function onBtnClick(place: Feature):void {
        if (!userLocation) return
        const [ lat, lng ] = place.center
        getRouteBetweenPoints(userLocation, [lat, lng])
    }

    if (isLoadingPlaces) {
        return(
            <div>
                Loading...
            </div>
        )
    }

    if ( places?.length == 0 ) return(<></>)

    return(
        
        <ul className="list-group mt-3">
            
            {
                places!.map((place) => 
                    <li className={`list-group-item list-group-item-action ${activeId === place.id ? 'active' : ''}`} key={place.id} onClick={() => onPlaceClick(place)}>
                        <h6>{place.text_pt}</h6>
                        <p
                            className="text-muted"
                            style={{
                                fontSize: '12px',
                            }}
                        >
                            {place.place_name_pt}
                        </p>

                        <button className={`btn ${activeId === place.id ? 'btn-outline-light' : 'btn-outline-primary'}`} onClick={() => onBtnClick(place)} >
                            Direcciones
                        </button>
                    </li>
                )
            }
            
        </ul> 
    )
}