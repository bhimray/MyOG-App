import React from 'react'
import './MobNav.css'
const MobNav = () => {
  const dropDown = "<"
  return (
    <div className='mob-nav-wrapper'>
      <div className='mn-circle-container'>
        <div className="mn-circle-background"></div>
      </div>
      <div className='mn-garage-symbol-wrapper'>
        <div className='mn-symbol'>MyOG</div>
        <div className='mn-dropDown'>{dropDown}</div>
      </div>
      <div className='mn-search-location-wrapper'>
        <div className='mn-location-symbol'>lI</div>
        <div className='mn-search-bar'>
          <div className='mn-search-icon'>sI</div>
          <input type="text" className='mn-search-bar-field'/>
          <div className='mn-search-filter'>fI</div>
        </div>
      </div>
    </div>
  )
}

export default MobNav