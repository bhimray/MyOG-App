import React, {useState} from 'react'
import { useEffect } from 'react'
import GarageForm from '../../../Service/Registration/GarageForm'
const HomePage = (children) => {
  console.log(children.decidingModal)
  return (
    <div>
      {/* <GarageForm/> */}
      {/* <SellerCard/>
      <Filter/> */}
      {children.navi}
      {children.decidingModal}
    </div>
  )
}

export default HomePage