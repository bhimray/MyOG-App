import React, {useState} from 'react'
import personBikingSolid from '../../svgIcons/person-biking-solid.svg'
import screwDriverWrenchSolid from '../../svgIcons/screwdriver-wrench-solid.svg'
import ClientLogin from '../Client/ClientLogin'
// import GoogleAuth from '../Client/GoogleAuth'
import ClientOrGarage from '../Service/Registration/ClientOrGarage'
import GarageForm from '../Service/Registration/GarageForm'
import LandingPage from '../Website/Landing/LandingPage'
import './DecidingModal.css'

const DecidingModal = () => {
    // let decidingModal;
    const [client, verifyClient] = useState('')
    const [showDecidingModal, setShowDecidingModal] = useState(true)

  return (
    <div>
        {showDecidingModal?
        <div className='dm-wrapper'>
            <div className="dm-note">What defines you please select ?</div>
            <div onClick={()=>[verifyClient('client'), setShowDecidingModal(false)]} className='dm-client-switch'>
                <img src={personBikingSolid} className='dm-client' style={{width:"2rem"}}/>
                <div className='dm-client'>Service Taker</div>
            </div>
            <div onClick={()=>[verifyClient('garage'), setShowDecidingModal(false)]} className='dm-garage-switch'>
                <img src={screwDriverWrenchSolid} className='dm-garage-icon' syle={{width:"1rem"}}/>
                <div className='dm-garage'>Service Provider</div>
            </div>
        </div>
        :
        <div>
        {client==="client"?
            <ClientLogin/>
            :
            <GarageForm/>
        }
        </div>  
    }
        {/* // :
        // <div className='dm-wrapper'>
        //     <ClientOrGarage client={client} classNameClient='dm-client-switch'/>
        // </div>
        // } */}
    </div>
  )
}

export default DecidingModal