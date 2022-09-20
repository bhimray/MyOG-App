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

  const [screenWidth, setScreenWidth] = React.useState(true)

  React.useEffect(()=>{
    console.log("useEffect is running")
    if (window.innerWidth>700){
        setScreenWidth(false)
    }
  },[screenWidth])
  return (
    <div className="App" >
      <div className="mainDiv">
        {/* <LandingPage/> */}
        <HomePage navi={screenWidth ? <MobNav sellerCard={<SellerCard/>} /> : <ComNav/>} />
      </div>
    </div>
  );
}

export default App;
