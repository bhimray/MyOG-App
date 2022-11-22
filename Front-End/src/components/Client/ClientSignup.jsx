import React, { useReducer, useContext, useEffect, useRef} from 'react'
import {Link, Navigate} from 'react-router-dom'
import HandleCredentialResponse from './GoogleAuth'
import './ClientSignup.css'
import { useState } from 'react'
import tick from "../../svgIcons/check-solid.svg"
import { gql, useMutation } from '@apollo/client';
import { AuthContext } from '../context/localSotrage'


const SIGN_UP = gql`
  mutation createUser($name:String, $email:String, $password:String){
  createUser(userInput:{Name:$name, Email:$email, Password:$password}){
    UserId
    Token
    TokenExpirationTime
	}
}
`;

const ClientSignup = () => {
  const {login, token} = useContext(AuthContext)
  const [signUpError, setError] = useState(null)
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
  }

  //
  const GOOGLE_SIGN_IN_UP = gql`
  mutation googleAuth($google_credential: String!) {
    googleAuth(google_credential: $google_credential) {
      UserId
      Token
      TokenExpirationTime
    }
  }
`;
const [AuthGoogle, { data:googleData, loading:googleLoading, error:googleError }] = useMutation(GOOGLE_SIGN_IN_UP)
// if (googleData) console.log(googleData)
useEffect(() => {
  if (googleData) {
    console.log(googleData, "sign up returned data")
    login(googleData.googleAuth)
  };
}, [googleData])
if (googleError) console.log(googleError)
/* global google */
const divRef = useRef(null);

useEffect(() => {
  if (divRef.current) {
    console.log(divRef.current,"divRef.current-------")
    window.google.accounts.id.initialize({
      Cross_Origin_Opener_Policy: "same-origin-allow-popups",
      ux_mode:"redirect",
      select_by:"user",
      login_uri:"https://myog-app.netlify.app/seller-card",
      client_id: "572374357644-oktb2lbpqhfe9s84nfb60pl425ka76el.apps.googleusercontent.com",
      callback: (res, error) => {
        console.log("google response", res, res.credential)
        AuthGoogle({variables: {
          google_credential:res.credential
        }})
        console.log("AuthGoogle is executed")
      },
    });
    // google.accounts.id.prompt();
    window.google.accounts.id.renderButton(divRef.current, {
      theme: 'filled_blue',
      size: 'medium',
      type: 'standard',
      text: 'continue_with',
    });
  }
}, [divRef.current]);

  // mutation
  const [SIGN_UP_MANUAL, { data, loading, error }] = useMutation(SIGN_UP, {
    variables: {
      "name":inputValue.fullname,
      "email":inputValue.email,
      "password":inputValue.password,
    },
  });
  //
  useEffect(() => {
    if (data) {
      console.log(data, "sign up returned data")
      login(data.createUser)
    };
  }, [data])
  if (googleLoading) return <div>Authenticating user</div>;
  if (loading) return <div>Loading sign up</div>;
  if (error) setError("Sign up error!!")
  //
  if (token){
    return <Navigate to='/seller-card'/>
  }else{
  return (
    <div>
        <div className="cl-main-container">
          <div className="cl-background">
            <div className="cl-background-img"></div>
            <div className="form-container">
              <form action="" className="signup-form">
                <div className="cl-profile-photo">{signUpError}</div>
                <div className="cl-input-container">
                  <div className="cl-input-labels">
                    <label htmlFor="">Full Name</label>
                    <input value={inputValue.fullname} type="text" onChange={(e)=>handleInputChange(e,e.target.value, "fullname")}/>
                  </div>
                  <div className="cl-input-labels">
                    <label htmlFor="">Email</label>
                    <input value={inputValue.email} type="email" pattern='/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/' onChange={(e)=>handleInputChange(e,e.target.value, "email")}/>
                  </div>
                  <div className="cl-input-labels">
                    <label htmlFor="">Mobile Number</label>
                    <input value={inputValue.mobilenumber} type="text"  pattern='/^[7-9][0-9]{9}$/' onChange={(e)=>handleInputChange(e,e.target.value, "mobilenumber")}/>
                  </div>
                  <div className="cl-input-labels">
                    <label htmlFor="">Password</label>
                    <input value={inputValue?.password} type="password" onChange={(e)=>handleInputChange(e,e.target.value, "password")}/>
                  </div>
                  <div className="cl-input-labels">
                    <label htmlFor="">Re-enter Password</label>
                    <div className="password-input-wrapper">
                      <input value={inputValue?.re_enter_password} type="password" onChange={(e)=>handleInputChange(e,e.target.value, "re_enter_password")}/>
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
                  <button onClick={(e)=>{e.preventDefault();SIGN_UP_MANUAL(); console.log("executing mutation")}} className="btn">Sign Up</button>
                </div>
                <div className="googleAuth" ref={divRef}>
                  <div id='buttonDiv'>Sign Up With Google</div>
                </div>
                <div className="cl-redirect-login">
                  <div>Already registered? <Link to="/login-form" style={{"color":"darkblue"}}>Login</Link></div>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}
}

export default ClientSignup