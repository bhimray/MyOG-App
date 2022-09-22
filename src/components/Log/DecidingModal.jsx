import React, {useState} from 'react'
import personBikingSolid from '../../svgIcons/person-biking-solid.svg'
import screwDriverWrenchSolid from '../../svgIcons/screwdriver-wrench-solid.svg'
import ClientOrGarage from '../Service/Registration/ClientOrGarage'
import LandingPage from '../Website/Landing/LandingPage'
import './DecidingModal.css'

const DecidingModal = () => {
    // let decidingModal;
    const [client, verifyClient] = useState('')

  return (
    <div>
        <div className='dm-wrapper'>
            <div onClick={()=>verifyClient('client')} className='dm-client-switch'>
                <img src={personBikingSolid} className='dm-client' style={{width:"1rem"}}/>
                <div className='dm-client'>Find garage and get help</div>
            </div>
            <div onClick={()=>verifyClient('garage')} className='dm-garage-switch'>
                <img src={screwDriverWrenchSolid} className='dm-garage-icon' syle={{width:"1rem"}}/>
                <div className='dm-garage'>Log garage and provide help</div>
            </div>
        </div>
        <ClientOrGarage client={client}/>
    </div>
  )
}

export default DecidingModal