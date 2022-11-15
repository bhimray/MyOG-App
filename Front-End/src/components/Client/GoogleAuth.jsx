import React from 'react'

const GoogleAuth = () => {
    /* global google */
    function handleCredentialResponse(response) {
        console.log("Encoded JWT ID token: " + response.credential);
        }
    const googleLogin = function () {
    google.accounts.id.initialize({
        client_id: "89523596296-rjlpnt4nsdehuimml2is4b8ootid6rgi.apps.googleusercontent.com",
        callback: handleCredentialResponse
    });
    google.accounts.id.renderButton(
        document.getElementById("buttonDiv"),
        { theme: "outline", size: "large" }  // customization attributes
    );
    google.accounts.id.prompt(); // also display the One Tap dialog
    }
  return (
    <div>
        <div id='buttonDiv' onClick={(e)=>googleLogin}>Sign Up with Google</div>
    </div>
  )
}

export default GoogleAuth