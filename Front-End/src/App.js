import React,{useState} from 'react';
import './App.css';
// import Filter from './components/Website/Filter/Filter';
import ComNav from './components/Website/Home/ComNav/ComNav';
import HomePage from './components/Website/Home/HomePage/HomePage';
import MobNav from './components/Website/Home/MobNav/MobNav';
import LandingPage from './components/Website/Landing/LandingPage';
// import Map from './components/Website/Map/MapIndex';
import SellerCard from './components/Service/SellerCard/SellerCard/SellerCard'
import SellerDetails  from './components/Service/SellerCard/sellerDetails/sellerDetails';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ClientOrGarage from './components/Service/Registration/ClientOrGarage';
import DecidingModal from './components/Log/DecidingModal';
import GarageForm from './components/Service/Registration/GarageForm';
// import GoogleAuth from './components/Client/GoogleAuth';
import CurrentPosition from './components/Website/Map/currentPosition';
import ClientSignup from './components/Client/ClientSignup';
import ClientLogin from './components/Client/ClientLogin';


function App() {

  // const [screenWidth, setScreenWidth] = React.useState(true)
  // React.useEffect(()=>{
  //   console.log("useEffect is running")
  //   if (window.innerWidth>700){
  //       setScreenWidth(false)
  //   }
  // },[screenWidth])

  return (
    <div className="App" >
      {/* <Map/> */}
      {/* <GoogleAuth/> */}
      {/* <CurrentPosition/> */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/signup-form" element={<ClientSignup/>}/>
          <Route path='/seller-card' element={<SellerCard/>}/>
          <Route path='/garage/:id' element={<SellerDetails/>}/>
          <Route path='/garage-form' element={<GarageForm/>}/>
          <Route path='/login-form' element={<ClientLogin/>}/>
          {/* <Route path='/client-google-auth' element={<GoogleAuth/>}/> */}
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;
