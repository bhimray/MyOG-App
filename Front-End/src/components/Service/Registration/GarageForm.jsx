import React, { useState } from 'react'
import squareLeftSolid from '../../../svgIcons/square-left-solid.svg'
import './GarageForm.css'
import {Link} from 'react-router-dom'

const GarageForm = ({toggleState}) => {
    let outerFormState= toggleState
    const [innerFormState, setInnerFormState] = useState(false)

    const changeInnerFormState=()=>{
        setInnerFormState(!innerFormState)
        console.log(innerFormState)
    }
    console.log("true",innerFormState==true && outerFormState==true, 'false', innerFormState==false && outerFormState==false)
  return (
    <div>
        <div className={(innerFormState==true && outerFormState==true) ||(innerFormState==false && outerFormState==false) ?'gf-wrapper':"gf-wrapper-hide"}>
            <div onClick={()=>changeInnerFormState()} className="gf-go-back-button">
                <div className="gf-go-back">
                    Go Back
                </div>
                <img src={squareLeftSolid} alt="" className="gf-go-back-icon" />
            </div>
            <form onSubmit="" action="" className="gf-form-wrapper">
                <div className="gf-field">
                    <input type="tel" id="gf-mobile" name="mobile" />
                    <div className='gf-example-text'>e.g. 9902384993</div>
                </div>
                <div className="gf-field">
                    <input type="text" id="gf-firstname" name='firstname'  />
                    <div className='gf-example-text'>e.g. Binod</div>
                </div>
                <div className="gf-field">
                    <input type="text" id="gf-lastname" name='lastname' />
                    <div className='gf-example-text'>e.g. Ray</div>
                </div>
                <div className="gf-field">
                    <input type="text" id="gf-garagename" name='garagename'  />
                    <div className='gf-example-text'>e.g. Swift Auto Repairs and Washer</div>
                </div>
                <div className="gf-field">
                    <input type="password" id="gf-password" name='password' />
                    <div className='gf-example-text'>e.g. @dkaAk7!A$vi0_-hI</div>
                </div>
                <div className="gf-field">
                    <input type="password" id="gf-confirm-password" name='confirmpassword' />
                    <div className='gf-example-text'>e.g. re-enter the password</div>
                </div>
                <button className='gf-register-button'>Register Now</button>
            </form>
        </div>
    </div>
  )
}

export default GarageForm