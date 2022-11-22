import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {AuthProvider} from './components/context/localSotrage'
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import {setContext} from '@apollo/client/link/context'

//httplink.....
const htttpLink = createHttpLink({
  uri:'http://localhost:5000'
})

const authLink = setContext((_, {headers})=>{
  return {
    headers:{
      ...headers,
      authorization:localStorage.getItem("token")|| ""
    }
  }
})
const queryClient = new ApolloClient({
  link:authLink.concat(htttpLink),
  cache:new InMemoryCache(),
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthProvider>
    <ApolloProvider client={queryClient}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </ApolloProvider>
  </AuthProvider>
);
reportWebVitals();
