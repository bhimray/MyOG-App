import React from 'react'
import { useParams } from 'react-router-dom'
import { sellerData } from '../../../Data/sellerCardData'

const SellerDetails = () => {
    const id= useParams()
    // console.log(id,typeof(id), "id")
    const garageOwner = sellerData.find((dataId)=>dataId.id == id.id)
    // console.log(garageOwner,"garageOwner")
    // console.log(garageOwner.Feedback, "feedback")
  return (
    <div className='sd-seller-deatils'>
        <div className='sd-profile-photo-name-review'>
            <div className='sd-review'>
                {garageOwner.Rating}
            </div>
            <div className='sd-profile-photo'>
                <img src={garageOwner.image.props.src} alt="" className="sc-photo" />
            </div>
            <div className='sd-name-location'>
                <div className='sd-name'>{garageOwner.name}</div>
                <div className='sd-address'>{garageOwner.Address}</div>
            </div>
        </div>
        <div className='sd-phone-dist'>
            <div className='sd-phone'>
                {garageOwner.MobileNumber}
            </div>
            <div className='sd-dist'>
                {garageOwner.Distance}
            </div>
        </div>
        <div className='sd-photos'>
            <div className='sd-photo'>
                PHOTOS
            </div>
        </div>
        <div className='sd-description'>
            <div className='sd-description-head'>
                Description
            </div>
            <div className='sd-description-details'>
                {garageOwner.Description}
            </div>
        </div>
        <div className='sd-feedback'>
            <div className='sd-feedback-head'>
                Feedback
            </div>
            <div className='sd-feedback-details'>
                
            </div>
        </div>
        <div className='sd-call-msg-owner'>
            <div className='sd-call'>

            </div>
            <div className='sd-msg'>

            </div>
            <div className='sd-owner'>

            </div>
        </div>
    </div>
  )
}

export default SellerDetails