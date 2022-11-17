import {useReducer, createContext} from "react"
import jwtDecode from 'jwt-decode'

if (localStorage.getItem('credential') === String){
    console.log("checking credential")
    const expTime = localStorage.getItem('credential').TokenExpirationTime
    console.log(expTime, "++++++++++++expTime++++++++++++++++++++++")
    if (expTime.exp*1000 < Date.now()){
        localStorage.removeItem('credential')
    } 
}

const contextValue={
    login:(props)=>{},
    logout:()=>{},
    token:""
}
const AuthContext = createContext(contextValue)

function AuthProvider(props){    
    const reducer=(state, { type, payload }) => {
      switch (type) {
    
        case 'login': {
            // ✅ return a new object
            return {
              ...state,
              credential:payload
            };
        }
        case 'logout': {
        // ✅ return a new object
        return {
            ...state,
            credential:null
        };
        }
      default:
        return state
      }
    }
    
    const [state, dispatch] = useReducer(reducer, {'credential':""})
    console.log(state.credential)
    const login=(props)=>{
        console.log(props, "this is props",props.Token, "createUser", props.Token,"props passed to the login function")
        // const stringifyToken = props ? JSON.stringify(props):"null";
        localStorage.setItem('credential', props.Token);
        const decodedToken = localStorage.getItem('credential')
        console.log('decodedToken', jwtDecode(decodedToken))
        dispatch({type:"login", payload:props})
        console.log(props, "this is token")

    }
    const logout=()=>{
        localStorage.removeItem('credential')
        dispatch({type:"logout"})
    }
    return (
        <AuthContext.Provider value={{login, logout, token:state.credential}} {...props}>
            
        </AuthContext.Provider>
    )

}

export {AuthContext, AuthProvider}