import axios from "axios"

const searchApi = axios.create({
    baseURL: 'https://api.mapbox.com/geocoding/v5/mapbox.places',
    params: {
        limit: 3,
        language: 'pt',
        country: 'br',
        access_token: 'pk.eyJ1IjoibGFtYXJja2l0byIsImEiOiJjbG03eXdnaGkwNDEyM2NwY2xnOHI3d2Z5In0.FuqUw-tN9FWRk7G0g88Mpw'
    }
})

export default searchApi