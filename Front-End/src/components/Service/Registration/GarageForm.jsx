import React, { useState, useReducer, useContext} from 'react'
import squareLeftSolid from '../../../svgIcons/square-left-solid.svg'
import './GarageForm.css'
import {Link, Navigate} from 'react-router-dom'
import { useMutation, gql } from '@apollo/client'
import { AuthContext } from '../../context/localSotrage'
// import garageFormPhoto from '../../../images/garage-form.png'
const GarageForm = () => {
    const {login, token} =useContext(AuthContext)
    const reducer = (state, action)=>{
        console.log(action.type, state)
        switch(action.type) {
            case 'mobile':{
                return {
                  ...state, mobile:action.payload
            }}
            case 'fullName':{
              return {
                ...state, fullName:action.payload
              }}
            case 'garageName':{
            return {
                ...state, garageName:action.payload
            }}
            case 'email':{
              return {
                ...state, email:action.payload
              }}
            case 'password':{
            return {
                ...state, password:action.payload
            }}
            case 'confirmPassword':{
                return {
                    ...state, confirmPassword:action.payload
                }}
            default:{
                console.log("there is no such type")
              return {...state};
            }
        }

    }

    const [state, dispatch] = useReducer(reducer, {'fullName':"", 'garageName':"", 'email':"", 'mobile':"", 'password':"", "confirmPassword":""})
    const handleInputChange = (e, value, field)=>{
        e.preventDefault();
        console.log(field, value)
        dispatch({type:field, payload:value})
    }
    console.log(state, "state.fullName")
    
    const GARAGE_SIGN_UP = gql`
        mutation createGarage($FullName:String, $GarageName:String, $Email:String, $Mobile:String, $Password:String) {
        createGarage(garageData: {FullName:$FullName, GarageName:$GarageName, Email:$Email, Mobile:$Mobile, Password:$Password}) {
            UserId
            Token
            TokenExpirationTime
        }
        }
    `;
  const [SignUpGarage, { data:garageData, loading:garageLoading, error:garageError }] = useMutation(GARAGE_SIGN_UP,{
    variables:{
        'FullName':state.fullName,
        'GarageName':state.garageName,
        'Email':state.email,
        'Mobile':state.mobile,
        'Password':state.password,
    }
    })
    if (garageData){
        console.log(garageData)
        login(garageData.createGarage)
        }
    if (garageError) console.log(garageError)
    if (garageLoading) return <div>Loading Garage Data</div>;


    if (token){
        return <Navigate to={`/garage-dashboard/${garageData.createGarage.UserId}`}/>
    }else{
    return (
    <div>
        <div className="gf-background-img"></div>
        <div className='gf-wrapper'>
            <Link to="/" className="gf-go-back-button">
                <div className="gf-go-back">
                    Go Back
                </div>
                <img src={squareLeftSolid} alt="" className="gf-go-back-icon" />
            </Link>
            <form action="" className="gf-form-wrapper">
                <div className="gf-field">
                    <label className='gf-example-text'>Mobile Number</label>
                    <input type="tel" id="gf-mobile" value={state.mobile} onChange={(e)=>handleInputChange(e,e.target.value,"mobile" )}/>
                </div>
                <div className="gf-field">
                    <label className='gf-example-text'>Full Name</label>
                    <input type="text" id="gf-firstname"  value={state.fullName} onChange={(e)=>handleInputChange(e, e.target.value, "fullName")} />
                </div>
                <div className="gf-field">
                <label className='gf-example-text'>Email</label>
                    <input value={state.email} type="email" pattern='/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/' onChange={(e)=>handleInputChange(e,e.target.value, "email")}/>
                  </div>
                <div className="gf-field">
                    <label className='gf-example-text'>Garage Name</label>
                    <input type="text" id="gf-garagename" value={state.garageName} onChange={(e)=>handleInputChange(e, e.target.value, "garageName")} />
                </div>
                <div className="gf-field">
                    <label className='gf-example-text'>Password</label>
                    <input type="password" id="gf-password" value={state.password} onChange={(e)=>handleInputChange(e, e.target.value, "password")} />
                </div>
                <div className="gf-field">
                    <label className='gf-example-text'>Re-enter Password</label>
                    <input type="password" id="gf-confirm-password" value={state.confirmPassword}  onChange={(e)=>handleInputChange(e, e.target.value, "re-password")} />
                </div>
                <button className='gf-register-button' onClick={(e)=>{e.preventDefault();SignUpGarage(); console.log("submitting form")}}>Register Now</button>
            </form>
        </div>
    </div>
  )
}
}

export default GarageForm