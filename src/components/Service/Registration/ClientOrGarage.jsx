import React from 'react'

const ClientOrGarage = () => {

  return (
    <div>
      <div>LogIn</div>
      {client ? <div>SignUp</div>:<div>Register</div>}
    </div>
  )
}

export default ClientOrGarage