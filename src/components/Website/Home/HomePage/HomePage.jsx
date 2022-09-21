import React, {useState} from 'react'
import { useEffect } from 'react'
import GarageForm from '../../../Service/Registration/GarageForm'
const HomePage = (children) => {
  return (
    <div>
      <GarageForm/>
      {/* <SellerCard/>
      <Filter/> */}
      {children.navi}
    </div>
  )
}

export default HomePage