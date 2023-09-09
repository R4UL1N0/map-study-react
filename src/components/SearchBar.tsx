import { ChangeEvent, useContext, useRef } from "react"
import { PlacesContext } from "../context"
import { SearchResults } from "."

export const SearchBar = () => {

    const { searchPlacesByTerm, isLoadingPlaces, places } = useContext(PlacesContext)
    const debounceRef = useRef<NodeJS.Timeout>()

    const onQueryChanged = ( event: ChangeEvent<HTMLInputElement> ) => {
        if ( debounceRef.current ) {
            clearTimeout( debounceRef.current ) 
        }

        debounceRef.current = setTimeout(() => {
            // todo: buscar o ejecutar consulta
            console.log('debounced value:', event.target.value)
            searchPlacesByTerm(event.target.value)
            // event.target.value = ""
        }, 1000)
    }
    
    return(
        <div className="search-contianer" style={{
            position: 'fixed',
            top: '20px',
            left: '20px',
            backgroundColor: 'white',
            zIndex: 999,
            boxShadow: '0px 5px 10px rgba(0, 0, 0, 0.2)',
            width: '250px',
            padding: '5px',
            borderRadius: '5px'
        }}>
            <input onChange={ onQueryChanged } type="text" className="form-control" placeholder="Buscar lugar..."/>
            
                <SearchResults />
                
        </div>
    )
}