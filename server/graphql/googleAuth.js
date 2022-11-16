const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(CLIENT_ID);

async function verify() {
    console.log("executing google token verification")
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience:"89523596296-rjlpnt4nsdehuimml2is4b8ootid6rgi.apps.googleusercontent.com",  // Specify the CLIENT_ID of the app that accesses the backend
        // Or, if multiple clients access the backend:
        //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    });
    const payload = ticket.getPayload();
    console.log(payload, "this is payload")
    const userid = payload['sub'];
    console.log("this is user id ", userid)
    // If request specified a G Suite domain:
    // const domain = payload['hd'];
  }
  verify().catch(console.error);
module.exports ={
    googleAuth: async (args, req) => {
        try{
            console.log("verifying token")
            verify(args.token)
        }catch{
            console.log("error occurred")
        }
        try{
        args.userInput.Password = await bcrypt.hash(args.userInput.Password, 12)
        console.log(args.userInput.Password, "hashed_password")
        const user = new userData(args.userInput)
        //
        mongoose.connect(MONGO_DB)
        const returnedUser = await user.save().then((res)=>{console.log(res,"user saved"); return res}).catch((err)=>err)
        console.log("returned user", returnedUser)
        const Token = jwt.sign({_id:returnedUser._id, email:returnedUser.Email}, process.env.JWT_SECRET, {expiresIn:1})
        return {UserId:returnedUser._id, Token:Token, TokenExpirationTime:1}
        } catch (err){
        console.log(err)
        }
    },
}