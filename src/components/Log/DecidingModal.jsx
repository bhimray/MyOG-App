import React, {useState} from 'react'
import personBikingSolid from '../../svgIcons/person-biking-solid.svg'
import screwDriverWrenchSolid from '../../svgIcons/screwdriver-wrench-solid.svg'
import ClientOrGarage from '../Service/Registration/ClientOrGarage'
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
            <div onClick={()=>[verifyClient('client'), setShowDecidingModal(false)]} className='dm-client-switch'>
                <img src={personBikingSolid} className='dm-client' style={{width:"2rem"}}/>
                <div className='dm-client'>Find garage and get help</div>
            </div>
            <div onClick={()=>[verifyClient('garage'), setShowDecidingModal(false)]} className='dm-garage-switch'>
                <img src={screwDriverWrenchSolid} className='dm-garage-icon' syle={{width:"1rem"}}/>
                <div className='dm-garage'>Log garage and provide help</div>
            </div>
        </div>:
        <div className='dm-wrapper'>
            <ClientOrGarage client={client} classNameClient='dm-client-switch'/>
        </div>
        }
    </div>
  )
}

export default DecidingModal