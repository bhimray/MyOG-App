import React, {useMemo} from 'react'
import {GoogleMap, useLoadScript, Marker} from "@react-google-maps/api"
import { Wrapper, Status } from "@googlemaps/react-wrapper";

export default function MapContainer (){
  const {isLoaded} = useLoadScript({
    googleMapApiKey:"AIzaSyDiQk6-UIiGl0_cEtSfy_8YQY61oOV3-dM"
  })
  if (!isLoaded) return <div>Loading....</div>;
  return (
    <div>
      <Map/>
    </div>
  )
}


function Map(){
  const center = useMemo(()=>({lat:44, lng:-80}),[]);
  return(
    <GoogleMap zoom={10} center={center}>
      <Marker position={center}></Marker>
    </GoogleMap>
  )
}