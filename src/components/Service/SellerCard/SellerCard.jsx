import React from 'react'
import {sellerData} from '../../Data/sellerCardData'
import routeSolid from '../../../svgIcons/route-solid.svg'
import './sellerCard.css'
import starRegular from '../../../svgIcons/star-regular.svg'

console.log('sellerCardData', sellerData)
const SellerCard = () => {
  console.log('sellercard.jsx is called')
  return (
    <div className='sc-wrapper'>
      {
        sellerData.map((data)=>{
          console.log(data.image.props.src)
          return(         
          <div className='sc-wrapper-card'>
          <div className='sc-status'>
            {data.status}
          </div>
          <div className='sc-wrapper-partition'>
            <div className='sc-review-dist'>
              <div className='sc-review'>
                <img src={starRegular} alt="" className="sc-star" />
                {data.Rating}
              </div>
              <div className='sc-dist'>
                <div className='sc-dist-text'>
                  {data.Distance} k.m.
                </div>
                <img src={routeSolid} alt="" className='sc-dist-icon' />
              </div>
            </div>
            <div className='sc-name-address-photo-service'>
              <div className="sc-name-address-photo">
                <div className="sc-name-address">
                  <div className="sc-name">{data.name}</div><br/>
                  <div className='sc-address'>
                    {data.Address.map((address)=>{
                      return(
                        <>
                        <div className="sc-bit-address">{address}</div>
                        
                        </>
                      )
                    })}
                  </div>
                </div>
                <img src={data.image.props.src} alt="" className="sc-photo" />
              </div>
              <div className='sc-service-type'>
                {data.serviceType}
              </div>
            </div>
          </div>
          </div>
        ) 
        }
      )
      }
    </div>
  )
}

export default SellerCard