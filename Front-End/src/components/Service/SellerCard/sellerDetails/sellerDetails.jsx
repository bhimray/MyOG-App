import React from 'react'
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
const male = ()=> Avatar('all');

const SellerDetails = () => {
    const GARAGE_DETAILS_QUERY=gql`
    query garageProfile($UserId:String){
        garageProfile(UserId:$UserId){
            Name
            GarageName
            Email
            Mobile
            GeoCode{
                lat
                lng
            }
            Address
            ServiceType
            OpeningClosingTime
            Customer{
                latitude
                longitude
                date
            }
        }
    }
    `
    const {id} = useParams()
    const {data:garageDetails, loading:detailsLoading, error:detailsError} = useQuery(GARAGE_DETAILS_QUERY,{
        variables:{
        UserId:id
        }
    })

    if (garageDetails) console.log(garageDetails);
    if (detailsLoading) return <div>Loading....</div>;
    if (detailsError) console.log("detailsError",detailsError);


    // // console.log(id,typeof(id), "id")
    const garageOwner = sellerData.find((dataId)=>dataId.id == "1")
    // console.log(garageOwner,"garageOwner")
    // console.log(garageOwner.Feedback[0].feedback, "feedback")
  return (
    <div className='sd-seller-deatils'>
        <div className='sd-profile-photo-name-review'>
            <div className='sd-review-backicon'>
                <div className="sd-review-backicon-1">
                    <div className='sd-review'>
                        <img src={starRegular} alt="" className="sd-review-icon" />
                        <div className="sd-rating">4</div>
                    </div>
                    <Link to="/"><img src={BackIcon} alt="" className="sd-backicon" /></Link>
                </div>
            </div>
            <div className='sd-profile'>
                <img src={garageOwner.image.props.src} alt="" className="sd-profile-photo" />
            </div>
            <div className='sd-name-address'>
                <div className='sd-name'>{garageOwner.name}</div>
                <div className='sd-address'>
                    {garageOwner.Address.map((address)=>{
                      return(
                        <>
                        <div className="sc-bit-addre">{address}</div> 
                        </>
                      )
                    })}
                </div>
            </div>
        </div>
        <div className='sd-phone-dist'>
            <div className='sd-phone'>
                <img src={phoneSolid} alt="" className="sd-phone-icon" />
                <div className='sd-phone-number'>{garageDetails.garageProfile.Mobile}</div>
            </div>
            <div className='sd-dist'>
                <img src={streetViewSolid} alt="" className="sd-dist-icon" />
                <div className="sd-dist">{garageOwner.Distance}</div>
            </div>
        </div>
        <div className='sd-photos'>
            <div className='sd-photo'>
                {[male(), male(), male()].map((photo)=><div className='sd-avatar-photo'>{photo}</div>)}
            </div>
        </div>
        <div className='sd-description'>
            <div className='sd-description-head'>
                Description
            </div>
            <div className='sd-description-details'>
                {garageOwner?.Description}
            </div>
        </div>
        <div className='sd-feedback'>
            <div className='sd-feedback-head'>
                Feedback
            </div>
            <div className='sd-feedback-details'>
                {garageOwner?.Feedback?.map((data)=>{
                    const currentDate= new Date()
                    return(
                        <div className="sd-feedback-wrapper">
                            <div className='sd-feedback-date'>{currentDate.getDay()}-{currentDate.getDate()}-{currentDate.getFullYear()}</div>
                            <div className="sd-feedback-name-feedback">
                                <div className='sd-feeder-name'>{data.name}</div>
                                <div className='sd-feedback-feedback'>{data.feedback}</div>
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