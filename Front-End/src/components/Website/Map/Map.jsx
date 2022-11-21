import React from 'react'
import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import {
  GoogleMap,
  MarkerF,
  DirectionsRenderer,
  Circle,
  MarkerClusterer,
} from "@react-google-maps/api";
import Places from "./Places";
import Distance from "./Distance";
import './Map.css'

const Map = () => {
  /* global google */
  // const center = useMemo(() => (), [])
  const [center, setCenter]= useState({lat:"", lng:""})
  const [readableAddress, setReadableAddress] = useState("")
  const [direction, setDirection] = useState()
  const [garages, setGarages] = useState()

  const fetchDirection = (garage) => {
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
          setDirection(result);
        }
      }
    );
  };
  const generateHouses = (position) => {
    const _houses = [];
    for (let i = 0; i < 100; i++) {
      const direction = Math.random() < 0.5 ? -2 : 2;
      _houses.push({
        lat: position.lat + Math.random() / direction,
        lng: position.lng + Math.random() / direction,
      });
    }
    return _houses;
  };
  useEffect(() => {
    setGarages(()=>center?.lat ?generateHouses(center):null)
  }, [center])
  

  useEffect(() => {
    var options = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0
    };
    
    function success(pos) {
      var crd = pos.coords;
    
      console.log('Your current position is:');
      console.log(`Latitude : ${crd.latitude}`);
      console.log(`Longitude: ${crd.longitude}`);
      console.log(`More or less ${crd.accuracy} meters.`);
      setCenter(prevState=>({...prevState, lat:crd.latitude, lng:crd.longitude}))
    };
    
    function error(err) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    };
    
    navigator.geolocation.getCurrentPosition(success, error, options);// 1st provide center position
    // if (navigator.geolocation){
    //   navigator.geolocation.getCurrentPosition(
    //     function (position){setCenter(prevState=>({...prevState, lat:position.coords.latitude, lng:position.coords.longitude}))},
    //     failure => {
    //       if (failure.message.startsWith("Only secure origins are allowed")) {
    //       console.log(failure)
    //       }
    //     },
    //     {maximumAge:600000, timeout:5000, enableHighAccuracy: true}
    //   )
    //   // console.log(position, "currentPosition")
    // }else{
    //   console.log("error finding navigator in device")
    // }
    
  }, [navigator.geolocation])
  
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
      {center.lat?
      <GoogleMap 
      zoom={18}
      center={center}
      mapContainerClassName='map-container'
      >
        <MarkerF position={center}></MarkerF>
        {/* <Circle center={center} radius={500} options={closeOptions}/> */}
        
        {garages?.map((garage) => {
          console.log(garage,"this is garage")
          return(<MarkerF
            key={garage.lat}
            position={garage}
            // clusterer={clusterer}
            onClick={() => {
              fetchDirection(garage);
            }}
          />
          )})
        }

        {/* showing direction on map */}
        {direction && (
            <DirectionsRenderer
              directions={direction}
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