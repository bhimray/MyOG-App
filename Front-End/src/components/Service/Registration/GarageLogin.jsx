import React,{useState, useReducer, useEffect, useRef, useContext} from 'react'
import { useMutation, gql } from '@apollo/client';
import { Navigate, Link } from 'react-router-dom';
import { AuthContext } from '../../context/localSotrage';


const GarageLogin = () => {
const {login, token, tag} = useContext(AuthContext)
const [EmailError, setEmailError] = useState(null)
const [PasswordError, setPasswordError] = useState(null)

const reducer=(inputValue, action)=>{
    switch (action.type) {
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
    }
}
    
const [inputValue, setInputValue] = useReducer(reducer,{
    "email":"",
    "mobilenumber":"",
    "password":"",
})

const handleInputChange=(e, Value, CaseType)=>{
    e.preventDefault();
    setInputValue({type:CaseType,payload:Value})
}
    

const LOGIN = gql`
    mutation userLogin($email: String, $mobile:String, $password:String) {
    garageLogin(garageLoginInput:{Email:$email, Number:$mobile, Password:$password}){
    __typename
    ... on privateData{
        Tag
        UserId
        Token
        TokenExpirationTime
    }
    ... on loginError{
        emailError
        passwordError
    }
    }
}
`;    

const [Login, { data:LoginData, loading:LoginLoading, error:LoginError }] = useMutation(LOGIN,{
    variables:{
        email:inputValue.email,
        mobile:inputValue.mobile,
        password:inputValue.password
    }
})
useEffect(() => {
    console.log(LoginData, "LoginData......................")
    if (LoginData?.garageLogin.__typename === 'privateData') {
        console.log(LoginData, "sign up returned data")
        login(LoginData.garageLogin)
    };
    if (LoginData?.garageLogin.__typename === 'loginError'){
        const emailError = LoginData.garageLogin.emailError
        const passwordError = LoginData.garageLogin.passwordError
        if (emailError){
            (()=>setEmailError(emailError))()
        }
        if (passwordError) {
        (()=>setPasswordError(passwordError))()
        }
        console.log("there is loginError", LoginData?.garageLogin)
        // setUserError(LoginData?.userLogin.)
    }
    }, [LoginData])
if (LoginLoading) return <div>Loading...</div>  
if (LoginError) console.log("Login error", LoginError)
if (token && tag === 'GARAGE'){
    return <Navigate to={`/garage-dashboard/${LoginData._id}`}/>
}else{
  return (
    <div>
        <form action="" className="form-div">
            <div className="gf-form-wrapper-top">
                <div className="gf-form-wrapper">
                    <div className="gf-field">
                    <label htmlFor="" className='gf-example-text'>Email</label>
                    <input className="text-input" 
                    value={inputValue.email} type="email" 
                    pattern='/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/' 
                    onChange={(e)=>handleInputChange(e,e.target.value, "email")}
                    onTouchStart={(e)=>{e.preventDefault();setEmailError(null)}}
                    />
                    <div>{EmailError? EmailError:null}</div>
                    </div>
                    {/* <div className="cl-input-labels">
                    <label htmlFor="">Mobile Number</label>
                    <input value={inputValue.mobilenumber} type="text"  
                    pattern='/^[7-9][0-9]{9}$/' 
                    onChange={(e)=>handleInputChange(e,e.target.value, "mobilenumber")}
                    
                    />

                    </div> */}
                    <div className="cl-input-labels">
                    <label htmlFor="">Password</label>
                    <input value={inputValue?.password} type="password" 
                    onChange={(e)=>handleInputChange(e,e.target.value, "password")} 
                    onTouchStart={(e)=>{e.preventDefault();setPasswordError(null)}}
                    />
                    <div className='ui-error'>{PasswordError? PasswordError:null}</div>
                    </div>
                    <br/>
                    <div className="button-wrapper" onClick={Login}>
                    <button className="btn">
                        Log in
                    </button>
                    </div>
                    {/* {inputValue?.re_enter_password?.length !== inputValue?.password?.length && inputValue?.re_enter_password !== inputValue?.password ? <div syle={{"color":"red", "font-size":"0.6rem"}}>password does not match</div>:"null"} */}
                </div>
                <div className="cl-redirect-login">
                  <div>Don't have account? <Link to="/garage-form" style={{"color":"darkblue"}}>Sign up</Link></div>
                </div>
            </div>
        </form>
    </div>
  )
    }
}

export default GarageLogin