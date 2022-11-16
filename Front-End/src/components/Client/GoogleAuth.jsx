import { gql, useMutation } from '@apollo/client';

const GOOGLE_SIGN_IN_UP = gql`
  mutation ($token: String!) {
    googleAuth(type: $type) {
      Name
      Email
      Photo
    }
  }
`;

export default function HandleCredentialResponse(response) {
    const [AuthGoogle, { data, loading, error }] = useMutation(GOOGLE_SIGN_IN_UP, {
        variables: {
          token:response.credential
        },
      });
      AuthGoogle()
    if (loading) return <div style={{"backgroundColor":"whitesmoke", "padding":"2rem"}}>Authenticating. Please wait...</div>;
    if (data) console.log(data, "returned mutation data")
    console.log("Encoded JWT ID token: " + response.credential);
}

