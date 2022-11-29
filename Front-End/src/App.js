import React,{useState} from 'react';
import './App.css';
import HomePage from './components/Website/Home/HomePage/HomePage';
import SellerCard from './components/Service/SellerCard/SellerCard/SellerCard'
import SellerDetails  from './components/Service/SellerCard/sellerDetails/sellerDetails';
import { BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import CurrentPosition from './components/Website/Map/currentPosition';
import ClientSignup from './components/Client/ClientSignup';
import ClientLogin from './components/Client/ClientLogin';
import GarageLogin from './components/Service/Registration/GarageLogin';
import SellerDashBoard from './components/Service/SellerCard/sellerDetails/SellerDashBoard';
import SharedLayout from './components/SharedLayout/SharedLayout';

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
      {/* <SignupForm/> */}
      <BrowserRouter>
        <Routes>
          <Route path='/seller-card' element={<SellerCard/>}/>
          <Route path='/' element={<SharedLayout/>}>
            <Route index element={<HomePage/>}/>
            <Route path="/signup-form" element={<ClientSignup/>}/>
            <Route path='/garage-profile/:id/:lat/:lng' element={<SellerDetails/>}/>
            <Route path='/garage-dashboard/:id' element={<SellerDashBoard/>}/>
            <Route path='/garage-form' element={<CurrentPosition/>}/>
            <Route path='/login-form' element={<ClientLogin/>}/>
            <Route path='/garage-login-form' element={<GarageLogin/>}/>
          </Route>
          <Route path='*' element={<div>Page does not exist. Return to <Link to='/' style={{color:"blue", fontSize:"2rem"}}>Home</Link></div>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;
