export const getUserLocation = async (): Promise<[number, number]> => {

    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
            ({ coords }) => {
                console.log([ coords.longitude, coords.latitude ])
                resolve([ coords.longitude, coords.latitude ])
            },
            ( err ) => {
                alert('No se pudo obtener la geolocalización.')
                console.log(err)
                reject()
            }
        )
    })
}