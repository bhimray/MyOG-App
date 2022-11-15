import React, { useReducer } from 'react'
import {Link} from 'react-router-dom'
import GoogleAuth from './GoogleAuth'
import './ClientLogin.css'
import { useState } from 'react'
import tick from "../../svgIcons/check-solid.svg"
const ClientLogin = () => {
  const [matchPassword, setMatchPassword] = useState(false)
  
  const reducer=(inputValue, action)=>{
    switch (action.type) {
      case 'fullname': {
        return {
          ...inputValue,
          fullname: action.payload
        };
      }
      case 'email': {
        return {
          ...inputValue,
          email: action.payload
        };
      }
      case 'mobilenumber': {
        return {
          ...inputValue,
          mobilenumber: action.payload
        };
      }
      case 'password': {
        return {
          ...inputValue,
          password: action.payload
        };
      }
      case 're_enter_password': {
        return {
          ...inputValue,
          re_enter_password: action.payload
        };
      }
  }
}

  const [inputValue, setInputValue] = useReducer(reducer,{
    "fullname":"",
    "email":"",
    "mobilenumber":"",
    "password":"",
    "re_enter_password":""
  })
  const handleInputChange=(e,value, key)=>{
    e.preventDefault();
    console.log(key, value, inputValue,inputValue.password,"incoming value")
    const runSetFunc = new Promise(function(resolve, reject){
      console.log("running resolve function")
      resolve(setInputValue({type:key, payload:value})
      )
    }).then(function(){
      if (key==="re_enter_password"){
        console.log("entering to check", value, inputValue.password)
        setMatchPassword(value === inputValue.password ? true: false)
      }
    }).catch(function(){
      console.log("it is rejected")
    })
    
    // {inputValue?.re_enter_password !== inputValue?.password ?
  }

  /* global google */
  function handleCredentialResponse(response) {
    console.log("Encoded JWT ID token: " + response.credential);
    }
  window.onclick= function () {
  google.accounts.id.initialize({
      client_id: "89523596296-rjlpnt4nsdehuimml2is4b8ootid6rgi.apps.googleusercontent.com",
      callback: handleCredentialResponse
  });
  google.accounts.id.renderButton(
      document.getElementById("buttonDiv"),
      { theme: "dark", size: "medium" }  // customization attributes
  );
  google.accounts.id.prompt(); // also display the One Tap dialog
  }
  return (
    <div>
        <div className="cl-main-container">
          <div className="cl-background">
            <div className="cl-background-img"></div>
            <div className="form-container">
              <form action="" className="signup-form">
                {/* <div className="cl-profile-photo"><img src="" alt="" /></div> */}
                <div className="cl-input-container">
                  <div className="cl-input-labels">
                    <label htmlFor="">Full Name</label>
                    <input value={inputValue.fullname} type="text" onChange={(e)=>handleInputChange(e,e.target.value, "fullname")}/>
                  </div>
                  <div className="cl-input-labels">
                    <label htmlFor="">Email</label>
                    <input value={inputValue.email} type="text" onChange={(e)=>handleInputChange(e,e.target.value, "email")}/>
                  </div>
                  <div className="cl-input-labels">
                    <label htmlFor="">Mobile Number</label>
                    <input value={inputValue.mobilenumber} type="text" onChange={(e)=>handleInputChange(e,e.target.value, "mobilenumber")}/>
                  </div>
                  <div className="cl-input-labels">
                    <label htmlFor="">Password</label>
                    <input value={inputValue?.password} type="text" onChange={(e)=>handleInputChange(e,e.target.value, "password")}/>
                  </div>
                  <div className="cl-input-labels">
                    <label htmlFor="">Re-enter Password</label>
                    <div className="password-input-wrapper">
                      <input value={inputValue?.re_enter_password} type="text" onChange={(e)=>handleInputChange(e,e.target.value, "re_enter_password")}/>
                      {matchPassword? <img src={tick} style={{"width":"1rem"}} alt="" className="password-match-tick"/>:null}
                    </div>
                  </div>
                  {/* {inputValue?.re_enter_password?.length !== inputValue?.password?.length && inputValue?.re_enter_password !== inputValue?.password ? <div syle={{"color":"red", "font-size":"0.6rem"}}>password does not match</div>:"null"} */}
                </div>
              </form>
              <div className="cl-form-outside-container">
                <div className="cl-consent">
                  <img src="" alt="" className="cl-consent-img" />
                  <div className="cl-consent-tag">I agree with the <a href="">Terms of use</a></div>
                </div>
                <div className="cl-button">
                  <button className="btn">Sign Up</button>
                </div>
                <div className="googleAuth">
                  <div id='buttonDiv' >Sign Up with Google</div>
                </div>
                <div className="cl-redirect-login">
                  <div>Already registered? <Link to="" style={{"color":"darkblue"}}>Login</Link></div>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default ClientLogin