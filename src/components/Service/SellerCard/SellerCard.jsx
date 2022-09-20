import React from 'react'
import {sellerData} from '../../Data/sellerCardData'
import routeSolid from '../../../svgIcons/route-solid.svg'
console.log('sellerCardData', sellerData)
const SellerCard = () => {
  console.log('sellercar.jsx is called')
  return (
    <div>
      <div>hi</div>
      {
        sellerData.map((data)=>{
          <>
          <div>Hi seller</div>
          <div className='sc-wrapper'>
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
                <div className='sc-dist-icon'>
                  <i>{routeSolid}</i>
                </div>
              </div>
            </div>
            <div className='sc-name-address-service'>
              <div className='sc-name-address'>

              </div>
              <div className='sc-service-type'>

              </div>
            </div>
          </div>
          </>
        })
      }
    </div>
  )
}

export default SellerCard