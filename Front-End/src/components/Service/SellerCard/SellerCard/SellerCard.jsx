import React, {useState, useEffect} from 'react'
import {sellerData} from './../../../Data/sellerCardData'
import routeSolid from '../../../../svgIcons/route-solid.svg'
import './sellerCard.css'
import starRegular from '../../../../svgIcons/star-regular.svg'
import motorcyleSolid from '../../../../svgIcons/motorcycle-solid.svg'
import carSolid from '../../../../svgIcons/car-solid.svg'
import busSolid from '../../../../svgIcons/bus-solid.svg'
import truckSolid from '../../../../svgIcons/truck-solid.svg'
import {Link} from 'react-router-dom'
import MapIndex from '../../../Website/Map/MapIndex'
import { useContext } from 'react'
import { AuthContext } from '../../../context/localSotrage'
import {Navigate, useParams} from 'react-router-dom'
import dummyProfile from '../../../../svgIcons/user-solid.svg'
import upIcon from '../../../../svgIcons/chevron-up-solid.svg'
import {useQuery, gql} from '@apollo/client'


console.log('sellerCardData', sellerData)
const SellerCard = () => {
  /* global google */
  const dummyGarage = sellerData.find((dataId)=>dataId.id == "1")
  const GARAGE_CARD_QUERY=gql`
  query garageFilteration{
    garageFilteration{
      __typename
      ... on garageArray{
        garages{
          _id
          ProfilePhoto
          GarageName
          GeoCode
          Address
          ServiceType
          OpeningClosingTime
          OverallRatings
        }
      }
      ... on garageDataError{
        message
      }
      } 
    }
  `
  const {logout, token} = useContext(AuthContext)
  console.log(">>>>>>> token from authcontext", token)
  const logoutFn = logout
  const [showFullMap, setShowFullMap] = useState(false)
  // const [GarageGeoCode, setGarageGeoCode] = useState([])
  // const [distance, setDistance] = useState(null);
  const [center, setCenter] = useState({lat:"", lng:""})
  const [garageData, setGarageData] = useState()
  const {data:garageBrief, loading:briefLoading, error:briefError} = useQuery(GARAGE_CARD_QUERY )
  const [direction, setDirection] = useState()
  var options = {
    enableHighAccuracy: true,
    maximumAge: 0,
  };
 
async function success(pos, GeoCode) {
    var crd = pos.coords;
    console.log("%%%%%%%%%%%%%%%%%%%%%%%%%",crd, garageBrief,"%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%")
    // console.log(crd, reverseGeocode,"value of the geocode and reverse geocode")
    // setDistance(google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(crd.latitude, crd.longitude), new google.maps.LatLng(GeoCode[0],GeoCode[1])))
  }

  function errors(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

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

  useEffect(() => {
    if (navigator.geolocation) {
      // console.log("finding current position")
      navigator.permissions
        .query({ name: "geolocation" })
        .then(function (result) {
          if (result.state === "granted") {
            // console.log(result.state);
            // console.log("calling successs function--------------1")
            //If granted then you can directly call your function here
            navigator.geolocation.getCurrentPosition(
              (position) => {
                const pos = {
                  lat: position.coords.latitude,
                  lng: position.coords.longitude,
                };
                setCenter(prevState=>({...prevState, lat:pos.lat, lng:pos.lng}))
              },
            )
            
          } else if (result.state === "prompt") {
            return navigator.geolocation.getCurrentPosition(success, errors, options);
          } else if (result.state === "denied") {
            //If denied then you have to show instructions to enable location
            console.log("denied")
          }
          // result.onchange = function () {
          //   console.log(result.state);
          // };
        });
    } else {
      alert("Sorry geolocation is Not available!");
    }
  }, [])
  
  // const distCalculator=(GeoCode) => {
  //   console.log("GeoCode and Current Position______>",GeoCode)
  //   if (GeoCode[0]){
  //     // console.log("GeoCode[0]")
  //     const value =()=>setGarageGeoCode((prev)=>[...prev, GeoCode])
  //     // const setdistance = ()=> setDistance(google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(center.lat, center.lng), new google.maps.LatLng(GeoCode[0],GeoCode[1])))
  // }
  // }
  // console.log("GargeGeoCode in SellerCard", GarageGeoCode)
  console.log("garage array", garageBrief)
  useEffect(() => {
    if (garageBrief) {
      setGarageData(garageBrief.garageFilteration.garages)
      // var garageBriefData = garageBrief.garageFilteration.garages
      console.log("returned value of garage info",garageBrief.garageFilteration.garages)
      // return <div>garage array data is returned... please check console</div>
    };
  }, [garageBrief])
  
 
  if (briefLoading) return <div>Loading....</div>;
  if (briefError) console.log("detailsError",briefError);

  console.log('sellercard.jsx is called')
  let truckBus = 0;
  const handleDownSlide=(e)=>{
    e.preventDefault()
    setShowFullMap(true)
  }
  const handleLogout = (e)=>{
    e.preventDefault();
    logoutFn()
  }
  if (!token){
    return <Navigate to='/signup-form'/>
  }else{
  return (
    <>
    <MapIndex 
      onClick={handleDownSlide} 
      showFullMap={showFullMap} 
      garageData = {garageData}
      center = {center}
      direction = {direction}
    />
    {/* top sliding profile */}
    <div className={showFullMap?"sc-top-profile-reverse":"sc-top-profile"}>
      <div className="sc-top-profile-cont-1">
        <div className='sc-top-profile-cont'>
          <div className="sc-pic-status">
            <img src={dummyProfile}className="sc-pic"></img>
            <div className="sc-status-top"></div>
          </div>
          <div className="sc-logout-btn" onClick={handleLogout}>
            <div className="sc-button">
              <button className="btn-logout">Log Out</button>
            </div>
          </div>
        </div>
        {/* <div className="slide-info">
          <div className="slide_cont">
            <img src={upIcon} alt="" className='upIcon-top-profile' />
          </div>
        </div> */}
      </div>
    </div>

    <div className={showFullMap?'sc-main-wrapper sc-main-wrapper-downslide':'sc-main-wrapper'}>
    <div className={showFullMap?'sc-wrapper sc-wrapper-downslide':'sc-wrapper'}>
      <div className='sc-wrapper-head' onClick={()=>setShowFullMap(false)}>
        <div className="slide_cont">
          <img src={upIcon} alt="" className='upIcon-top-profile' />
        </div>
      </div>
      <div className="sc-card-wrapper-maincontainer"> 
      <div className="sc-card-wrapper-secondcontainer"> 
      {
        garageData?.map((data, i)=>{
          // console.log(data.GeoCode[0], new google.maps.LatLng(data.GeoCode[0], data.GeoCode[1]), center.lat,"value inside the mapping function in jsx")
          // distCalculator(data.GeoCode)
          return(     
          <div key={i} className='sc-wrapper-card'>
          <div className='sc-status'>
            open
          </div>
          <div className='sc-wrapper-partition'>
            <div className='sc-review-dist'>
              <div className='sc-review'>
                <img src={starRegular} alt="" className="sc-star" />
                <div className='sc-rating'>{
                data.OverallRatings ? data.OverallRatings : null
                }</div>
              </div>
              <div className='sc-dist' onClick={()=>[fetchDirection(new google.maps.LatLng(data.GeoCode[0], data.GeoCode[1])), setShowFullMap(true)]}>
                <div className='sc-dist-text'>
                  {
                  (google.maps.geometry.spherical.computeDistanceBetween(
                    new google.maps.LatLng(center.lat, center.lng), 
                    new google.maps.LatLng(data.GeoCode[0],data.GeoCode[1])
                    )/1000).toFixed(1)
                  }
                </div>
                <img src={routeSolid} alt="" className='sc-dist-icon' />
              </div>
            </div>
            <Link to={`/garage-profile/${data._id}/${center.lat}/${center.lng}`}>
            <div className='sc-name-address-photo-service'>
              <div className="sc-name-address-photo">
                <div className="sc-name">{data.GarageName}</div>
                <div className="sc-address-photo">
                  <div className='sc-address'>
                    {data.Address}
                  </div>
                  <img 
                    src={data.ProfilePhoto? data.ProfilePhoto:dummyGarage.image} 
                    alt="" 
                    className="sc-photo" 
                  />
                </div>
              </div>
              <div className='sc-service-type'>
                {()=>{
                  if (data.ServiceType=="Motorbike and cycle"){
                    // const ShowBike=true;
                    return(
                      <>
                      <img src={motorcyleSolid} alt="" className="sc-service-icon" />
                      <div className='sc-service-vehicle-type'>Bike</div>
                      </>
                    )
                  }else if (data.ServiceType == "Cycle, Motorbike and Car"){
                    // const ShowCar = true;
                    return(
                      <>
                      <img src={motorcyleSolid} alt="" className="sc-service-icon" />
                      <div className='sc-service-vehicle-type'>Bike</div>
                      <img src={carSolid} alt="" className="sc-service-icon" />
                      <div className='sc-service-vehicle-type'>Car</div>
                      </>
                    )
                  }else if ( data.ServiceType =='Heavy vehicles' || data.ServiceType === 'All'){
                    // const ShowTruck = true;
                    truckBus++
                    return(
                      <>
                      <img src={motorcyleSolid} alt="" className="sc-service-icon" />
                      <div className='sc-service-vehicle-type'>Bike</div>
                      <img src={carSolid} alt="" className="sc-service-icon" />
                      <div className='sc-service-vehicle-type'>Car</div>
                      <img src={truckSolid} alt="" className="sc-service-icon" />
                      <div className='sc-service-vehicle-type'>Truck</div>
                      <img src={busSolid} alt="" className="sc-service-icon" />
                      <div className='sc-service-vehicle-type'>Bus</div>
                      </>
                    )
                  }
                }
              }
              </div>
            </div>
            </Link>
          </div>
          </div>
          
        ) 
        }
      )
      }
    </div>
    </div>
    </div>
    </div>
    </>
  )
  }
}


export default SellerCard