import React, {useState, useReducer } from 'react'
import {Link} from 'react-router-dom'
import HandleCredentialResponse from '../../Client/GoogleAuth';
import GarageForm from './GarageForm';
const ClientOrGarage = (props) => {
  console.log(props,"clientorgarage props")
  let user;
  if (props.client == 'client'){
    user=true
  }else{
    user=false
  }
  const reducer=(state, action)=>{
    switch (action.type){
      case "login":
        return{
          login:true,
          register:false
        }
      case 'register':
        return{
          login:false,
          register:true,
          toggleForm:!state.toggleForm
        }
    }
  }
  const [state, dispatch] = useReducer(reducer,{login:false, register:false, toggleForm:true})
  console.log('user', user)
  console.log(state.toggleForm, 'toggleform')
  return (
    <div>
      <div>
        <div onClick={()=>dispatch({type:"login"})} className={`${props.classNameClient}`}>LogIn</div>
        {user ? <div onClick={()=>dispatch({type:"login"})} className={`${props.classNameClient}`}>SignUp</div>:<div onClick={()=>dispatch({type:"register"})} className={`${props.classNameClient}`}>Register</div>}
      </div>
      <div>
        {state.login?<HandleCredentialResponse/>: (state.register? <GarageForm toggleState={state.toggleForm}/>:null)}
      </div>    
    </div>
  )
}

export default ClientOrGarage