import React from 'react'
import './MobNav.css'
import sortDownSolid from '../../../../svgIcons/sort-down-solid.svg';
import locationDotSolid from '../../../../svgIcons/location-dot-solid.svg';
import magnifyingGlassSolid from '../../../../svgIcons/magnifying-glass-solid.svg';
import sliderSolid from '../../../../svgIcons/sliders-solid.svg';


const MobNav = (props) => {
  const [Opacity, changeOpacity]= React.useState(true)
  const elementRef = React.useRef()
  console.log(props.showPlaceHolder)
  // const hidePlaceHolder = props.showPlaceHolder

  const setOpacityCondition=(event)=>{
    
    // const target = elementRef.target.value
    // const element = document.getElementsByClassName(target)
    // console.log(element[0].nodeName, "element") if you get the element then you can draw nodeName from there
    // console.log("target", target, target)
    const target = event.target.value
    if (target > 1){
      changeOpacity(false)
    }else{
      changeOpacity(true)
    }
  }
  return (
    <div className='mn-main-wrapper'>
    <div className='mob-nav-wrapper'>
      <div className='mn-circle-container'>
        <div className="mn-circle-background"></div>
      </div>
      <div className='mn-nav-content'>
        <div className='mn-garage-symbol-wrapper'>
          <div className='mn-symbol'>MyOG</div>
          {/* <img src={sortDownSolid} alt="" className='sort-down-solid' /> */}
        </div>
        <div className='mn-search-location-wrapper'>
        <img src={locationDotSolid} alt="" className='mn-location-symbol'/>
          <div className='mn-search-bar'>
            <img src={magnifyingGlassSolid} alt="" className='mn-search-icon'/>
            <input type="text" className='mn-search-bar-field' onChange={setOpacityCondition} ref={elementRef} placeholder={Opacity? 'Search here...':""}/>
            <img src={sliderSolid} alt="" className='mn-search-filter'/>
          </div>
        </div>
      </div>
    </div>
    <div className='mn-seller-card'>{props.sellerCard}</div>
    </div>
  )
}

export default MobNav