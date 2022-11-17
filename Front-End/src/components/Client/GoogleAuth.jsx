import { gql, useMutation } from '@apollo/client';
import React from 'react'

const GOOGLE_SIGN_IN_UP = gql`
  mutation ($google_credential: String!) {
    googleAuth(google_credential: $google_credential) {
      UserId
      Token
      TokenExpirationTime
    }
  }
`;

const HandleCredentialResponse = (response) => {
  const [AuthGoogle, { data, loading, error }] = useMutation(GOOGLE_SIGN_IN_UP, {
    variables: {
      google_credential:response.credential
    },
  });
  AuthGoogle()
  if (loading) return <div style={{"backgroundColor":"whitesmoke", "padding":"2rem"}}>Authenticating. Please wait...</div>;
  if (data) console.log(data, "returned mutation data")
  console.log("Encoded JWT ID token: " + response.credential);

  return (
    <div>GoogleAuth</div>
  )
}
export default HandleCredentialResponse


