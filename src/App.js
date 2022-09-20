import React from 'react';
import './App.css';
import Filter from './components/Website/Filter/Filter';
import ComNav from './components/Website/Home/ComNav/ComNav';
import HomePage from './components/Website/Home/HomePage/HomePage';
import MobNav from './components/Website/Home/MobNav/MobNav';
import LandingPage from './components/Website/Landing/LandingPage';
import Map from './components/Website/Map/Map';
import SellerCard from './components/Service/SellerCard/SellerCard'

function App() {

  const [showPlaceHolder, setPlaceHolder] = React.useState(false)
  const [screenWidth, setScreenWidth] = React.useState(true)

  const elementRef = React.useRef()
  const setshowPlaceHolder=(event)=>{
    // const target = event.currentTarget.className
    const target = elementRef.current.className
    console.log("target app div", target)
    // const element = document.getElementsByClassName(target)

    // console.log(element[0].nodeName, "element") if you get the element then you can draw nodeName from there

    if (target == "mainDiv"){
      setPlaceHolder(true)
    }else{
      setPlaceHolder(false)
    }
  }

  React.useEffect(()=>{
    console.log("useEffect is running")
    if (window.innerWidth>700){
        setScreenWidth(false)
    }
  },[screenWidth])
  return (
    <div className="App" >
      <div ref={elementRef} className="mainDiv" onClick={setshowPlaceHolder}>
        {/* <LandingPage/> */}
        <HomePage navi={screenWidth ? <MobNav showPlaceHolder={showPlaceHolder}/> : <ComNav/>} />
      </div>
    </div>
  );
}

export default App;
