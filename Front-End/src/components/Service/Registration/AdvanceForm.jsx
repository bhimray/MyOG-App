import React,{useContext} from 'react';
import ReactDOM from 'react-dom';
import { Formik, Form, useField } from 'formik';
import * as Yup from 'yup';
import nextIcon from "../../../svgIcons/chevron-right-solid.svg"
import './AdvanceForm.css'
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useMutation, gql, concat } from '@apollo/client'
import { AuthContext } from '../../context/localSotrage'

const MyTextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  console.log("label", label)
  console.log("props", props)
  console.log("field", field, "and", meta)
  return (
    <div className="gf-field">
      <label htmlFor={props.id || props.name} className='gf-example-text'>{label}</label>
      <input className="text-input" {...field} {...props} id="gf-mobile"/>
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </div>
  );
};

const MyCheckbox = ({ children, ...props }) => {
  const [field, meta] = useField({ ...props, type: 'checkbox' });
  console.log("---------------children--------------")
  console.log("children", children)
  console.log("field",field)
  console.log("meta", meta)
  return (
    <div>
      <label className="checkbox-input gf-example-text">
        <input type="checkbox" {...field} {...props} id="gf-mobile"/>
        {children}
      </label>
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </div>
  );
};

const MySelect = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div>
      <label htmlFor={props.id || props.name} className='gf-example-text'>{label}</label>
      <select {...field} {...props} id="gf-mobile"/>
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </div>
  );
};


//validation
const Validation = Yup.object({
    fullName: Yup.string()
      .max(15, 'Must be 15 characters or less')
      .required('Required'),
    garageName: Yup.string()
      .max(20, 'Must be 30 characters or less')
      .required('Required'),
    mobile: Yup.string()
      .required('Required'),
    password: Yup.string()
        .min(5,'Password must be minimum 5 character long')
      .required('Required')

  })
  
// And now we can use these
const SignupForm = ({address}) => {
    const [step, setStep] = useState(0)
    console.log(address,"address------------------------")
    const {login, token} =useContext(AuthContext)

    //onSubmit handler
    const onSubmit = (values) => {
        console.log("this is values=====================================================", values)

        alert(JSON.stringify(values, null, 2));
        SignUpGarage({
            variables:{
                'FullName': values.fullName,
                'GarageName': values.garageName,
                'Email': values.email,
                'Password':values.password,
                'Mobile': `${values.mobile}`,
                'Address': values.address,
                'GeoCode': [values.latitude, values.longitude],
                'ServiceType': values.serviceType,
                'OCTime':[values.opentime, values.closetime]
            }
        })
    }
    const GARAGE_SIGN_UP = gql`
        mutation createGarage($FullName:String, $GarageName:String, $Email:String, $Mobile:String, $Password:String, $Address:String, $Geocode:latlng, $ServiceType:String, $OCTime:[String]) {
        createGarage(garageData: {FullName:$FullName, GarageName:$GarageName, Email:$Email, Mobile:$Mobile, Password:$Password, Address:$Address, GeoCode:$Geocode, ServiceType:$ServiceType, OCTime:$OCTime}) {
            UserId
            Token
            TokenExpirationTime
        }
        }
    `;

        //initial value
    const initialValues={
        fullName: '',
        email: '',
        mobile:'',
        password:'',
        garageName:'',
        serviceType:'',
        address:address?.reverseGeocode,
        latitude:address?.geocode.lat,
        longitude:address?.geocode.lng,
        opentime:'',
        closetime:'',
    }
  const [SignUpGarage, { data:garageData, loading:garageLoading, error:garageError }] = useMutation(GARAGE_SIGN_UP)
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
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={Validation}
        onSubmit={onSubmit}
      >
        <Form className='form-div'>
            <div className="form-step-wrapper">
            <div className="step-info">
                <div className="step-bar">
                    <div className="step-line"></div>
                    <div className="step-circle-wrapper">
                        <div className="step-circle" style={step===0?{backgroundColor:"darkblue"}:{backgroundColor:"white"}}></div>
                        <div className="step-circle" style={step===1?{backgroundColor:"darkblue"}:{backgroundColor:"white"}}></div>
                        <div className="step-circle" style={step===2?{backgroundColor:"darkblue"}:{backgroundColor:"white"}}></div>
                    </div>
                </div>
            </div>
            {step === 0 ?
            <div className='gf-form-wrapper-1'>
                <div className="gf-form-wrapper">
                    <label htmlFor="file" className="file-label profile-image">
                    </label>
                    <MyTextInput
                        name="file"
                        type="file"
                        accept="image/apng, image/avif, image/gif, image/jpeg, image/png, image/svg+xml, image/webp"
                    />
                    

                    <MyTextInput
                        label="Full Name"
                        name="fullName"
                        type="text"
                        placeholder="Jane"
                    />

                    <MyTextInput
                        label="Mobile"
                        name="mobile"
                        type="number"
                        placeholder="9864016596"
                    />

                    <MyTextInput
                        label="Email"
                        name="email"
                        type="email"
                        placeholder="jane@gmail.com"
                    />
                    <MyTextInput
                        label="Password"
                        name="password"
                        type="password"
                        placeholder="fkeonsh_45jKL"
                    />
                    <div className="shuffle-form" onClick={()=>setStep(1)}>
                        <div className="shuffle-btn-wrapper">
                            <button className='shuffle-btn'>Go Next</button>
                            <img src={nextIcon} alt="" className="next" />
                        </div>
                       
                    </div>                   
                </div>
            </div>
            : null }
            {step === 1 ?
            <div className='gf-form-wrapper-1'>
                <div className="gf-form-wrapper">
                    <MyTextInput
                        label="Garage Name"
                        name="garageName"
                        type="garage"
                        placeholder="Super Auto Repairs"
                    />

                    <MySelect label="Service Offer" name="serviceType" className="serviceType">
                        <option value="">Select a job type</option>
                        <option value="mortobike">Motorbike and cycle</option>
                        <option value="car">Cycle, Motorbike and Car</option>
                        <option value="truck">Heavy vehicles</option>
                        <option value="other">All</option>
                    </MySelect>

                    <div className="shuffle-form">
                        <div className="shuffle-btn-wrapper"  onClick={()=>setStep(0)}>
                            <img src={nextIcon} alt="" className="next prev" />
                            <button className='shuffle-btn'>Previous</button>
                        </div>
                        <div className="shuffle-btn-wrapper"  onClick={()=>setStep(2)}>
                            <button className='shuffle-btn'>Go Next</button>
                            <img src={nextIcon} alt="" className="next" />
                        </div>
                    </div>
                </div>
            </div>
            :null}
            {step === 2 ?
            <div className='gf-form-wrapper-1'>
                <div className="gf-form-wrapper">
                    <MyTextInput
                        label="Address"
                        name="address"
                        type="text"
                        placeholder="Belhi, Chakarghata, Sarlahi"
                        value={address?.reverseGeocode}
                    />

                    <MyTextInput
                        label="latitude"
                        name="latitude"
                        type="number"
                        placeholder="From google map"
                        value={address?.geocode.lat}
                    />
                    <MyTextInput
                        label="longitude"
                        name="longitude"
                        type="number"
                        placeholder="From google map"
                        value={address?.geocode.lng}
                    />

                    <MyTextInput
                        label="Opening Time"
                        name="opentime"
                        type="time"
                        placeholder="9:30 AM"
                    />
                    <MyTextInput
                        label="Closing Time"
                        name="closetime"
                        type="time"
                        placeholder="9"
                    />
                    <div className="shuffle-form">
                        <div className="shuffle-btn-wrapper"  onClick={()=>setStep(1)}>
                            <img src={nextIcon} alt="" className="next prev" />
                            <button className='shuffle-btn'>Previous</button>
                        </div>
                        <div className="shuffle-btn-wrapper">
                            <button type="submit" className='shuffle-btn'>Submit</button>
                            <img src={nextIcon} alt="" className="next" />
                        </div>
                    </div>
                </div>
            </div>
            :null}
            </div>
        </Form>
      </Formik>
    </>
  );
};
}

export default SignupForm;