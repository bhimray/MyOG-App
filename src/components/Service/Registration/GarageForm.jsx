import React from 'react'
import squareLeftSolid from '../../../svgIcons/square-left-solid.svg'
import './GarageForm.css'

const GarageForm = () => {
  return (
    <div>
        <div className="gf-wrapper">
            <div className="gf-go-back-button">
                <div className="gf-go-back">
                    Go Back
                </div>
                <img src={squareLeftSolid} alt="" className="gf-go-back-icon" />
            </div>
            <form action="" className="gf-form-wrapper">
                <div className="gf-field">
                    <input type="tel" id="gf-mobile" name="mobile" pattern='[0-9]{10}' />
                    <div className='gf-example-text'>e.g. 9902384993</div>
                </div>
                <div className="gf-field">
                    <input type="text" id="gf-firstname" name='firstname' pattern='[a-zA-z]' />
                    <div className='gf-example-text'>e.g. Binod</div>
                </div>
                <div className="gf-field">
                    <input type="text" id="gf-lastname" name='lastname' pattern='[a-zA-z]' />
                    <div className='gf-example-text'>e.g. Ray</div>
                </div>
                <div className="gf-field">
                    <input type="text" id="gf-garagename" name='garagename' pattern='[a-zA-z0-9]' />
                    <div className='gf-example-text'>e.g. Swift Auto Repairs and Washer</div>
                </div>
                <div className="gf-field">
                    <input type="text" id="gf-password" name='password' />
                    <div className='gf-example-text'>e.g. @dkaAk7!A$vi0_-hI</div>
                </div>
                <div className="gf-field">
                    <input type="text" id="gf-confirm-password" name='confirmpassword' />
                    <div className='gf-example-text'>e.g. re-enter the password</div>
                </div>
                <button className='gf-register-button'>Register Now</button>
            </form>
        </div>
    </div>
  )
}

export default GarageForm