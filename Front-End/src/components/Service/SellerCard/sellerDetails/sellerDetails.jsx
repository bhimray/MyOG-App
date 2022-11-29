import React,{useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import { sellerData } from '../../../Data/sellerCardData'
import './sellerDetails.css'
import phoneSolid from '../../../../svgIcons/phone-solid.svg'
import streetViewSolid from '../../../../svgIcons/street-view-solid.svg'
import starRegular from '../../../../svgIcons/star-regular.svg'
import { Avatar } from 'react-lorem-ipsum'
import BackIcon from '../../../../svgIcons/square-left-solid.svg'
import messageIcon from '../../../../svgIcons/message-regular.svg'
import {Link} from 'react-router-dom'
import { useQuery, gql } from '@apollo/client'
import useDist from '../../../Website/Map/Places'

const male = ()=> Avatar('all');

const SellerDetails = () => {
    /* global google */
  const [distance, setDistance] = useState(null);

  var options = {
    enableHighAccuracy: true,
    maximumAge: 0,
  };
    const GARAGE_DETAILS_QUERY=gql`
    query garageProfile($UserId:String){
        garageProfile(UserId:$UserId){
            ProfilePhoto
            Name
            GarageName
            Email
            Mobile
            GeoCode
            Address
            ServiceType
            About
            OpeningClosingTime
            OverallRatings
            Photo
            Customer{
                name
                latitude
                longitude
                date
                status
                canceledBy
                canceledReason
                FeedBack
            }
        }
    }
    `
    const {id, lat, lng} = useParams()
    const {data:garageDetails, loading:detailsLoading, error:detailsError} = useQuery(GARAGE_DETAILS_QUERY,{
        variables:{
        UserId:id
        }
    })

    if (garageDetails) {
        console.log(garageDetails)
        // 
        // const distanceBetween = useDist(garagePosition)
    };
    // function distCalculator(garagePosition){
    //     return useDist (garagePosition)
    // }
    if (detailsLoading) return <div>Loading....</div>;
    if (detailsError) console.log("detailsError",detailsError);

    

    // // console.log(id,typeof(id), "id")
    const garageOwner = sellerData.find((dataId)=>dataId.id == "1")
 
    async function success(pos) {
        var crd = pos.coords;
        console.log("%%%%%%%%%%%%%%%%%%%%%%%%%",crd, garageDetails,"%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%")
        // console.log(crd, reverseGeocode,"value of the geocode and reverse geocode")
        setDistance(google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(crd.latitude, crd.longitude), new google.maps.LatLng(garageDetails?.garageProfile.GeoCode[0], garageDetails?.garageProfile.GeoCode[1])))
      }
    
      function errors(err) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
      }
      const distCalculator=() => {
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
      }
      distCalculator(garageDetails?.garageProfile.GeoCode)

  return (
    <div className='sd-seller-deatils'>
        <div className='sd-profile-photo-name-review'>
            <div className='sd-review-backicon'>
                <div className="sd-review-backicon-1">
                    <div className='sd-review'>
                        <img src={starRegular} alt="" className="sd-review-icon" />
                        <div className="sd-rating">{
                            garageDetails?.garageProfile.OverallReview ? garageDetails?.garageProfile.OverallReview
                            :
                            <div>No Review</div>
                        }</div>
                    </div>
                    <Link to="/seller-card"><img src={BackIcon} alt="" className="sd-backicon" /></Link>
                </div>
            </div>
            <div className='sd-profile'>
                <img src={
                    garageDetails?.garageProfile.ProfilePhoto?
                    garageDetails?.garageProfile.ProfilePhoto:
                    garageOwner.image.props.src
                    } 
                    alt="" className="sd-profile-photo" 
                />
            </div>
            <div className='sd-name-address'>
                <div className='sd-name'>{garageDetails?.garageProfile.GarageName}</div>
                <div className='sd-address'>
                   <div className="sc-bit-addre">{garageDetails?.garageProfile.Address}</div> 
                </div>
            </div>
        </div>
        <div className='sd-phone-dist'>
            <div className='sd-phone'>
                <img src={phoneSolid} alt="" className="sd-phone-icon" />
                <div className='sd-phone-number'>{garageDetails?.garageProfile.Mobile}</div>
            </div>
            <div className='sd-dist'>
                <img src={streetViewSolid} alt="" className="sd-dist-icon" />
                <div className="sd-dist">
                    {
                    (google.maps.geometry.spherical.computeDistanceBetween(
                        new google.maps.LatLng(lat,lng), 
                        new google.maps.LatLng(garageDetails?.garageProfile.GeoCode[0],garageDetails?.garageProfile.GeoCode[1])
                    )/1000).toFixed(1)
                    }
                </div>
            </div>
        </div>
        <div className='sd-photos'>
            <div className='sd-photo'>
                {
                garageDetails?.garageProfile.Photo ?
                [male(), male(), male()]
                .map((photo, i)=>
                <div className='sd-avatar-photo' key={i}>{photo}</div>
                )
                :
                <div>No Photos</div>
            }
            </div>
        </div>
        <div className='sd-description'>
            <div className='sd-description-head'>
                Description
            </div>
            <div className='sd-description-details'>
                {
                garageDetails?.garageProfile.About?
                garageDetails?.garageProfile.About
                :
                <div>Add details description about your company</div>
                }
            </div>
        </div>
        <div className='sd-feedback'>
            <div className='sd-feedback-head'>
                Feedback
            </div>
            <div className='sd-feedback-details'>
                {garageDetails?.garageProfile.Customer.map((data)=>{
                    // const currentDate= new Date()
                    return(
                        <div className="sd-feedback-wrapper">
                            <div className='sd-feedback-date'>{data.date}</div>
                            <div className="sd-feedback-name-feedback">
                                <div className='sd-feeder-name'>{data.name}</div>
                                <div className='sd-feedback-feedback'>{data.FeedBack}</div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
        <div className='sd-call-msg-owner'>
            <div className='sd-msg'>
                <img src={messageIcon} alt="" className="sd-msg-icon" />
                <div className="sd-msg-icon-text">chat with us</div>
            </div>
            <div className='sd-call'>

            </div>
            <div className='sd-owner'>

            </div>
        </div>
    </div>
  )
}

export default SellerDetails