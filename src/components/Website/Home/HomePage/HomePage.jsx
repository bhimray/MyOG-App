import React, {useState} from 'react'
import { useEffect } from 'react'

const HomePage = (children) => {
  return (
    <div>
        {/* <SellerCard/>
        <Filter/> */}
        {children.navi}
    </div>
  )
}

export default HomePage