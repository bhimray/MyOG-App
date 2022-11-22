const userData = require('../mongoDB/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const { userValidationError } = require('../errorHandler')
const mongoose = require('mongoose');
require('dotenv').config()
const JWT_SECRET = "HElloBimlenDra@Gy@DaV12&bilenMYlastNaMe"
const MONGO_DB =  "mongodb+srv://Bilen:GYADAV12@cluster0.xz35uix.mongodb.net/?retryWrites=true&w=majority";

module.exports = {
  userLogin: async (args, req) => {
    const {Number, Email, Password} = args.userLoginInput;
    try{
      const user = await mongoose.connect(MONGO_DB)
      .then((res)=>{ return userData.findOne({Email})})
      .catch((err)=>{console.log(err,"connection err")})
      
      console.log(user, "found user")
      if (!user) throw Error("There is no user");
      console.log(Password, user.Password, jwt.decode(user.Password))
      const decodedPassword = await bcrypt.compare(Password, user.Password)
      console.log(decodedPassword, "this is decoded password")
      if (!decodedPassword) throw userValidationError("Password is incorrect")
      const Token = jwt.sign({_id:user._id, email:user.Email}, JWT_SECRET, {expiresIn:1})
      console.log(Token, "token")
      return {UserId:user._id, Token:Token, TokenExpirationTime:1}
    } catch (err) {
      console.log(err,"try catch error")
    }
    return { UserId: user._id, Token: Token, TokenExpirationTime: 1 };
  },
  
  garageLogin: async (args, {res}) => {
    console.log(args.garageLoginInput, "garage login args")
    const {Name, Email, Password} = args.garageLoginInput;
    try{
      
      const user = await mongoose.connect(MONGO_DB)
      .then((res)=>{ return garageData.findOne({Email})})
      .catch((err)=>{console.log(err,"connection err")})

      console.log(user, "found garage")
      if (!user) throw Error("There is no user");
      console.log(Password,user.Name, user.Password)
      const decodedPassword = await bcrypt.compare(Password, user.Password)
      console.log(decodedPassword, "this is decoded password")
      if (!decodedPassword) throw userValidationError("Password is incorrect")
      const Token = jwt.sign({_id:user._id, email:user.Email}, JWT_SECRET, {expiresIn:1})
      console.log(Token, "token")
      return {UserId:user._id, Token:Token, TokenExpirationTime:1}
    } catch (err) {
      console.log(err,"try catch error")
    }
    
    // res.cookie("id", Token, {
    //   httpOnly: true,
    //   secure: process.env.NODE_ENV === "production",
    //   maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days
    // });
    return { UserId: user._id, Token: Token, TokenExpirationTime: 1 };

  },
}