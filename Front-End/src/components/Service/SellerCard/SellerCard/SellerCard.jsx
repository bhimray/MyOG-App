import React, {useState} from 'react'
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

  const {login, logout, token} = useContext(AuthContext)
  const [showFullMap, setShowFullMap] = useState(false)

  const GARAGE_CARD_QUERY=gql`
  query garageFilteration($Tag:String){
      garageFilteration(Tag:$Tag){
        GarageName
        GeoCode{
          lat
          lng
        }
        Address
        ServiceType
        OpeningClosingTime
      }
  }
`

  const {id} = useParams()
  const {data:garageBrief, loading:briefLoading, error:briefError} = useQuery(GARAGE_CARD_QUERY)

  if (garageBrief) console.log(garageBrief);
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
    logout()
  }
  if (!token){
    return <Navigate to='/signup-form'/>
  }else{
  return (
    <>
    <MapIndex onClick={handleDownSlide} showFullMap={showFullMap}/>
    {/* top sliding profile */}
    <div className={showFullMap?"sc-top-profile-reverse":"sc-top-profile"}>
      <div className="sc-top-profile-cont-1">
        <div className='sc-top-profile-cont'>
          <div className="sc-pic-status">
            <img src={dummyProfile}className="sc-pic"></img>
            <div className="sc-status-top">Searching..</div>
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
        garageBrief.map((data)=>{
          // console.log(data.image.props.src)
          return(     
          <div key={data._id} className='sc-wrapper-card'>
          <div className='sc-status'>
            open
          </div>
          <div className='sc-wrapper-partition'>
            <div className='sc-review-dist'>
              <div className='sc-review'>
                <img src={starRegular} alt="" className="sc-star" />
                <div className='sc-rating'>4</div>
              </div>
              <div className='sc-dist'>
                <div className='sc-dist-text' onClick={()=>setShowFullMap(true)}>
                  5 k.m.
                </div>
                <img src={routeSolid} alt="" className='sc-dist-icon' />
              </div>
            </div>
            <Link to={`/garage/${data._id}`}>
            <div className='sc-name-address-photo-service'>
              <div className="sc-name-address-photo">
                <div className="sc-name">{data.GarageName}</div>
                <div className="sc-address-photo">
                  <div className='sc-address'>
                    {data.Address 
                    // .map((address)=>{
                    //   return(
                    //     <>
                    //     <div className="sc-bit-address">{address}</div> 
                    //     </>
                    //   )
                    // })
                    }
                  </div>
                  <img src={data.image.props.src} alt="" className="sc-photo" />
                </div>
              </div>
              <div className='sc-service-type'>
                {data.serviceType.map((service1, i)=>{
                  let service = service1.toLowerCase()
                  // console.log(typeof(service), "service")
                  if (service=="bike"){
                    // const ShowBike=true;
                    return(
                      <>
                      <img src={motorcyleSolid} alt="" className="sc-service-icon" />
                      <div className='sc-service-vehicle-type'>{service}</div>
                      </>
                    )
                  }else if (service == "car"){
                    // const ShowCar = true;
                    return(
                      <>
                      <img src={carSolid} alt="" className="sc-service-icon" />
                      <div className='sc-service-vehicle-type'>{service}</div>
                      </>
                    )
                  }else if (service == "truck" || service == "bus" && truckBus==0){
                    // const ShowTruck = true;
                    truckBus++
                    return(
                      <>
                      <img src={truckSolid} alt="" className="sc-service-icon" />
                      <div className='sc-service-vehicle-type'>Truck</div>
                      <img src={busSolid} alt="" className="sc-service-icon" />
                      <div className='sc-service-vehicle-type'>Bus</div>
                      </>
                    )
                  }
                }
                )}
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