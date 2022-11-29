import React from 'react'
import { useState, useMemo, useCallback, useRef, useEffect, createContext } from "react";
import {
  GoogleMap,
  MarkerF,
  DirectionsRenderer,
  Circle,
  MarkerClusterer,
} from "@react-google-maps/api";
import './Map.css'

const Map = ({garageData, center, direction}) => {
  /* global google */

  console.log("GarageGeoCode in map", garageData, center)
  const [readableAddress, setReadableAddress] = useState("")
  const [direction1, setDirection1] = useState()
  const [garages, setGarages] = useState()

  const fetchDirection = (garage) => {
    console.log(garage, center, "while fetching direction")
    if (!center.lat) return;

    const service = new google.maps.DirectionsService();
    service.route(
      {
        origin: garage,
        destination: center,
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === "OK" && result) {
          console.log(result, "results of the directions selected")
          setDirection1(result);
        }
      }
    );
  };
  const generateGarages = (garages) => {
    const _garagesLocation = [];
    for (let geoCode of garages) {
      const direction = geoCode.GeoCode;
      _garagesLocation.push({
        lat: direction[0],
        lng: direction[1],
      });
    }
    return _garagesLocation;
  };
  useEffect(() => {
    setGarages(()=>center?.lat ? generateGarages(garageData):null)
  }, [center])
  
  const getAddress = (center)=>{
    if (center.lat){
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({location:center})
      .then((response)=>{console.log(response,"location geocoded"); setReadableAddress(response.results[0].formatted_address.split(",")[1])})
    }
  }
  useEffect(() => {
    const address = center.lat ? getAddress(center):null//2nd use center when available to get readable address
  }, [center])
  
  console.log(readableAddress,"readableAddress") //3rd print the readableAddress
  
  return (
    <div className="map-wrapper">
      {center?.lat?
      <GoogleMap 
      zoom={18}
      center={center}
      mapContainerClassName='map-container'
      >
        <MarkerF position={center}></MarkerF>
        {/* <Circle center={center} radius={500} options={closeOptions}/> */}
        
        {garages?.map((garage, i) => {
          console.log(garage,"this is garage")
          const position = {lat:garage.lat, lng:garage.lng}
          console.log(position, "position")
          return(
          <div key={i}>
          {position.lat ?
          <MarkerF
            key={i}
            position={google.maps.LatLng(position)}
            // clusterer={clusterer}
            onClick={() => {
              fetchDirection(position);
            }}
          />:null}
          </div>
          )})
        }

        {/* showing direction on map */}
        {direction && (
            <DirectionsRenderer
              directions={direction||direction1}
              options={{
                polylineOptions: {
                  zIndex: 50,
                  strokeColor: "#1976D2",
                  strokeWeight: 5,
                },
              }}
            />
          )}
        <Circle center={center} radius={15000} options={closeOptions} />
        <Circle center={center} radius={30000} options={middleOptions} />
        <Circle center={center} radius={45000} options={farOptions} />
      </GoogleMap>
      :
      <div> Getting current Location...</div>
      }
    </div>
  )
}

export default Map


const defaultOptions = {
  strokeOpacity: 0.5,
  strokeWeight: 2,
  clickable: false,
  draggable: false,
  editable: false,
  visible: true,
};
const closeOptions = {
  ...defaultOptions,
  zIndex: 3,
  fillOpacity: 0.05,
  strokeColor: "#8BC34A",
  fillColor: "#8BC34A",
};
const middleOptions = {
  ...defaultOptions,
  zIndex: 2,
  fillOpacity: 0.05,
  strokeColor: "#FBC02D",
  fillColor: "#FBC02D",
};
const farOptions = {
  ...defaultOptions,
  zIndex: 1,
  fillOpacity: 0.05,
  strokeColor: "#FF5252",
  fillColor: "#FF5252",
};