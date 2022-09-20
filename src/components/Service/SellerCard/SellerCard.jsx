import React from 'react'
import {sellerData} from '../../Data/sellerCardData'
import routeSolid from '../../../svgIcons/route-solid.svg'
import './sellerCard.css'

console.log('sellerCardData', sellerData)
const SellerCard = () => {
  console.log('sellercard.jsx is called')
  return (
    <div className='sc-wrapper'>
      {
        sellerData.map((data)=>{
          return(         
          <>
          <div className='sc-status'>
            {data.status}
          </div>
          <div className='sc-wrapper-partition'>
            <div className='sc-review-dist'>
              <div className='sc-review'>
                {data.Rating}
              </div>
              <div className='sc-dist'>
                <div className='sc-dist-text'>
                  {data.Distance}
                </div>
                <img src={routeSolid} alt="" className='sc-dist-icon' />
              </div>
            </div>
            <div className='sc-name-address-service'>
              <div className="sc-name-address-photo">
                <div className="sc-name-address">
                  <div className="sc-name">{data.name}</div>
                  <div className='sc-address'>
                    {data.Address}
                  </div>
                </div>
                <img src={data.image} alt="" className="sc-photo" />
              </div>
              <div className='sc-service-type'>
                {data.serviceType}
              </div>
            </div>
          </div>
          </>
        ) 
        }
      )
      }
    </div>
  )
}

export default SellerCard