import React from 'react'

const ClientOrGarage = (props) => {
  let user;
  if (props.client == 'client'){user=true}else{user=false}
  return (
    <div>
      <div>LogIn</div>
      {user ? <div>SignUp</div>:<div>Register</div>}
    </div>
  )
}

export default ClientOrGarage