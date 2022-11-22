import React, {useState} from 'react'
import { useEffect } from 'react'
import DecidingModal from '../../../Log/DecidingModal'
import GarageForm from '../../../Service/Registration/GarageForm'
import LandingPage from '../../Landing/LandingPage'
const HomePage = (children) => {

  const [isLandingPageDisplayed, setLandingPageDisplayed] = useState(true)
  console.log(children.decidingModal)

  React.useEffect(() => {
    setInterval(() => {
    setLandingPageDisplayed(false); 
  }, 3000);
  }, []);

  return (
    <div>
      {isLandingPageDisplayed?
      <LandingPage/>
      :
      <DecidingModal/>
      }
    </div>
  )
}

export default HomePage