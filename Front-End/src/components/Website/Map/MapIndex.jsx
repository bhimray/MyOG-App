import React from 'react'
import { useLoadScript } from '@react-google-maps/api'
import Map from './Map'

const libraryArray = ["places",""]
const MapIndex = ({onClick, showFullMap}) => {
    const {isLoaded}  = useLoadScript({
        googleMapsApiKey:"AIzaSyCUQZBdHSfRg0OhB58RTbgvdsUhq6q1ydM",
        libraries:libraryArray
    })
    if (!isLoaded) return <div>Loading.....</div>
  return (
    <div onClick={()=>{console.log("slide down");{showFullMap === false && onClick()}}}>
        <Map/>
    </div>
  )
}

export default MapIndex