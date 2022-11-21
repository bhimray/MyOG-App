require('dotenv').config()
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID);
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose');
const UsersDB = require('../mongoDB/user');
require('dotenv').config()
const JWT_SECRET = "HElloBimlenDra@Gy@DaV12&bilenMYlastNaMe"
const MONGO_DB =  "mongodb+srv://Bilen:GYADAV12@cluster0.xz35uix.mongodb.net/?retryWrites=true&w=majority";

async function verify(credential) {
    console.log("executing google token verification")
    const ticket = await client.verifyIdToken({
        idToken: credential,
        audience:"572374357644-oktb2lbpqhfe9s84nfb60pl425ka76el.apps.googleusercontent.com",  // Specify the CLIENT_ID of the app that accesses the backend
        // Or, if multiple clients access the backend:
        //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    });
    const payload = ticket.getPayload();
    mongoose.connect(MONGO_DB)
    const anyUser = await UsersDB.findOne({Email:payload['email']});
    if (anyUser){
        console.log(anyUser,"google user exist in db");
        const Token = jwt.sign({_id:anyUser._id, email:anyUser.Email}, JWT_SECRET, {expiresIn:1})
        return {UserId:anyUser._id, Token:Token, TokenExpirationTime:1}

    }else{
        UsersDB({
            Name:payload.name,
            Email:payload.email,
        }).save().then((res)=>{
            const Token = jwt.sign({_id:res._id, email:res.Email}, process.env.JWT_SECRET, {expiresIn:1})
            return {UserId:res._id, Token:Token, TokenExpirationTime:1}

        })
    }
    console.log(payload, "this is payload")
    const userid = payload['sub'];
    console.log("this is user id ", userid)
    // If request specified a G Suite domain:
    // const domain = payload['hd'];
}
module.exports ={
    googleAuth: async (args, req) => {
        try{
            console.log("verifying token", `args is ${args.google_credential}`)
            return verify(args.google_credential).catch(err=>console.log(err,"google verification error"))
        }catch{
            console.log("error occurred")
        }
    },
}