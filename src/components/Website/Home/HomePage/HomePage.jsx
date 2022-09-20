import React, {useState} from 'react'
import { useEffect } from 'react'
import SellerCard from '../../../Service/SellerCard/SellerCard'
import Filter from '../../Filter/Filter'
import ComNav from '../ComNav/ComNav'
import MobNav from '../MobNav/MobNav'



const HomePage = () => {
    const [screenWidth, setScreenWidth] = useState(true)
    useEffect(()=>{
        if (window.innerWidth>700){
            setScreenWidth(false)
        }
    },[screenWidth])

  return (
    <div>
        {screenWidth ? <MobNav/> : <ComNav/>}
        {/* <SellerCard/>
        <Filter/> */}
    </div>
  )
}

export default HomePage