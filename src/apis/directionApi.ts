import axios from "axios";

const directionsAPI = axios.create({
    baseURL: 'https://api.mapbox.com/directions/v5/mapbox/driving',
    params: {
        alternatives: false,
        continue_straight: true,
        geometries: 'geojson',
        overview: 'simplified',
        steps: false,
        access_token: 'pk.eyJ1IjoibGFtYXJja2l0byIsImEiOiJjbG03eXdnaGkwNDEyM2NwY2xnOHI3d2Z5In0.FuqUw-tN9FWRk7G0g88Mpw'
    }
})

export default directionsAPI