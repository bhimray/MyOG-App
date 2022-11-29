//useFetch.js
import { useState, useEffect } from "react";

const useDist = (garageGeocode) => {
  /* global google */
  const [distance, setDistance] = useState(null);

  var options = {
    enableHighAccuracy: true,
    maximumAge: 0,
  };
  
  async function success(pos) {
    var crd = pos.coords;
    // console.log(crd, reverseGeocode,"value of the geocode and reverse geocode")
    console.log("Your current position is:");
    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude: ${crd.longitude}`);
    console.log(`More or less ${crd.accuracy} meters.`);
    setDistance(google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(crd.latitude, crd.longitude), new google.maps.LatLng(garageGeocode.latitude, garageGeocode.longitude)))
    return {'latitude':crd.latitude,'longitude':crd.longitude}
  }

  function errors(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }
  useEffect(() => {
    if (navigator.geolocation) {
      console.log("finding current position")
      navigator.permissions
        .query({ name: "geolocation" })
        .then(function (result) {
          if (result.state === "granted") {
            console.log(result.state);
            console.log("calling successs function--------------1")
            //If granted then you can directly call your function here
            const currentPosition = navigator.geolocation.getCurrentPosition(success);
            
          } else if (result.state === "prompt") {
            return navigator.geolocation.getCurrentPosition(success, errors, options);
          } else if (result.state === "denied") {
            //If denied then you have to show instructions to enable location
            console.log("denied")
          }
          result.onchange = function () {
            console.log(result.state);
          };
        });
    } else {
      alert("Sorry geolocation is Not available!");
    }
  }, [])

  return [distance];
};

export default useDist;