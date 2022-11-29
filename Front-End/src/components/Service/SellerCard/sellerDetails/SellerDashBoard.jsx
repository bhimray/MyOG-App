import React from 'react'
import { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { AuthContext } from '../../../context/localSotrage'

const SellerDashBoard = () => {
    const {token, logout, tag} = useContext(AuthContext)
    const handleLogout=()=>{
        console.log("logging out")
        logout();
        console.log("yes, logged out");
        // <Navigate to='/garage-login-form'/>
    }
    if (!token){
        console.log(token, "token");
        return <Navigate to='/garage-login-form'/>
    }else if (token && tag==='GARAGE'){
  return (
    <div>
        <h1>Seller Dashboard</h1>
        <button onClick={()=>handleLogout()}>Log out</button>
    </div>
  )
}
}

export default SellerDashBoard