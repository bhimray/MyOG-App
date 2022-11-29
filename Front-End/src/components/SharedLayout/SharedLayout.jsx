import React from 'react'
import { useContext } from 'react'
import './SharedLayout.css'
import { Navigate, Outlet, Link } from 'react-router-dom'
import { AuthContext } from '../context/localSotrage'
const SharedLayout = () => {
    const {logout, token} = useContext(AuthContext)
    const handleLogout = ()=>{
        logout()
        console.log("logging out shlay");
        return <Navigate to='/'></Navigate>
    }
return (
<div>
    <div className="sl-1">
        <div className='sl-2'>
            {/* <div className="sl-3a">
                <div>MyOG</div>
            </div> */}
            <div className="sl-3b" onClick={()=>handleLogout()}>
                <Link to="/" className="sl-button">
                    <button className="btn-logout">Home</button>
                </Link>
            </div>
        </div>
    </div>
    <Outlet/>
</div>
)
}

export default SharedLayout