import React, { Component, useState ,useEffect, useContext} from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../context/localSotrage";
import GarageForm from "../../Service/Registration/GarageForm";
import jwtDecode from 'jwt-decode'
import SignupForm from "../../Service/Registration/AdvanceForm";


var options = {
  enableHighAccuracy: true,
  maximumAge: 0,
};

const CurrentPosition=()=> {
  /* global google */
  const [decodedToken, setDecodedToken] = useState(null)
  const [coordinate, setCoordinate] = useState()
  useEffect(() => {
    console.log("decoding token")
    if (localStorage.getItem('credential')){
      const tokens = localStorage.getItem('credential')
      const decodeToken = jwtDecode(tokens)
      setDecodedToken(decodeToken)
      console.log(decodeToken,"in current position")
    } 
  }, [decodedToken])
  
  console.log("inisitializing zeocode--------------------0")
  // var geocoder= new google.maps.Geocoder()
  const [address, setAddress] = useState({'geocode':'', 'reverseGeocode':""});

  const getAddress = async(center)=>{
    if (center.latitude){
      const geocoder = new google.maps.Geocoder();
      console.log("calling geocoder_-----------------------2")
      var latlng = {lat:center.latitude, lng:center.longitude}
      const decodedAddress = await geocoder.geocode({location:latlng})
      .then((response)=>{console.log(response,"location geocoded"); return response})
      console.log(decodedAddress, "decodedAddress")
      return decodedAddress;
    }
  }

  async function success(pos) {
    var crd = pos.coords;
    const reverseGeocode = await getAddress(crd).then((res)=>{
      console.log(res, "response from address decoder")
      setAddress({...address, 'geocode':{lat:crd.latitude, lng:crd.longitude}, 'reverseGeocode':res.results[0].formatted_address})
    })
    console.log(crd, reverseGeocode,"value of the geocode and reverse geocode")
    console.log("Your current position is:");
    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude: ${crd.longitude}`);
    console.log(`More or less ${crd.accuracy} meters.`);
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
            navigator.geolocation.getCurrentPosition(success);
  
          } else if (result.state === "prompt") {
            navigator.geolocation.getCurrentPosition(success, errors, options);
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

  console.log(address,"address")

  if (decodedToken){
    return <Navigate to={`/garage-dashboard/${decodedToken._id}`}/>
  }else{
  return (
    <div>
      {/* <pre>{address.reverseGeocode}</pre> */}
      <SignupForm address={address}/>
      {/* <GarageForm address={address}/> */}
    </div>
  );
  }
}
export default CurrentPosition