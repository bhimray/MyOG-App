import React,{useReducer, useEffect, useRef, useContext} from 'react'
import { useMutation, gql } from '@apollo/client';
import "./ClientSignup.css"
import { AuthContext } from '../context/localSotrage';
import { Navigate } from 'react-router-dom';
const ClientLogin = () => {
    /* global google */
    //
    const {login, token} = useContext(AuthContext)
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
        userLogin(userLoginInput:{Email:$email, Number:$mobile, Password:$password}) {
            UserId
            Token
            TokenExpirationTime
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
        if (LoginData) {
          console.log(LoginData, "sign up returned data")
          login(LoginData.userLogin)
        };
      }, [LoginData])
    // if (LoginData) {
    //     console.log("Login data laoded", LoginData)
    //     login()
    // }
    if (LoginLoading) return <div>Loading...</div>
    if (LoginError) console.log("Login error", LoginError)

    if (token){
        return <Navigate to="/seller-card"/>
    }else{
  return (
    <div>
         <form action="" className="signup-form">
                <div className="cl-profile-photo"></div>
                <div className="cl-input-container">
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
                  <br/>
                  <div className="button-wrapper" onClick={Login}>
                    <button className="btn">
                        Log in
                    </button>
                  </div>
                  {/* {inputValue?.re_enter_password?.length !== inputValue?.password?.length && inputValue?.re_enter_password !== inputValue?.password ? <div syle={{"color":"red", "font-size":"0.6rem"}}>password does not match</div>:"null"} */}
                </div>
              </form>
    </div>
  )
    }
}

export default ClientLogin