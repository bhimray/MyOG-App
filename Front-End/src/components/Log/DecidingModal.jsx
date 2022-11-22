import React, {useState} from 'react'
import personBikingSolid from '../../svgIcons/person-biking-solid.svg'
import screwDriverWrenchSolid from '../../svgIcons/screwdriver-wrench-solid.svg'
import {Link} from 'react-router-dom'
import ClientLogin from '../Client/ClientSignup'
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
        <div className='dm-wrapper'>
            <div className="dm-note">What defines you please select ?</div>
            <Link to="/signup-form" className='dm-client-switch'>
                <img src={personBikingSolid} className='dm-client' style={{width:"2rem"}}/>
                <div className='dm-client'>Service Taker</div>
            </Link>
            <Link to='/garage-form' className='dm-garage-switch'>
                <img src={screwDriverWrenchSolid} className='dm-garage-icon' syle={{width:"1rem"}}/>
                <div className='dm-garage'>Service Provider</div>
            </Link>
        </div>
    </div>
  )
}

export default DecidingModal