const userData = require('../mongoDB/user')
const garageData = require('../mongoDB/garage')
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
      if (!user) {
        return {
          __typename:"loginError",
          emailError: `The user with the id ${Email} does not exist.`,
        };
      }
      console.log(Password, user.Password, jwt.decode(user.Password))
      const decodedPassword = await bcrypt.compare(Password, user.Password)
      console.log(decodedPassword, "this is decoded password")
      if (!decodedPassword){
        return {
          __typename:'loginError',
          passwordError:`Incorrect password`
        }
      }
      const Token = jwt.sign({_id:user._id, email:user.Email}, JWT_SECRET, {expiresIn:1})
      console.log(Token, "token")
      return {__typename:"privateData", UserId:user._id, Token:Token, TokenExpirationTime:1, Tag:user.Tag}
    } catch (err) {
      console.log(err,"try catch error")
    }
  },
  
  garageLogin: async (args, req) => {
    const {Number, Email, Password} = args.garageLoginInput;
    try{
      const user = await mongoose.connect(MONGO_DB)
      .then((res)=>{ return garageData.findOne({Email})})
      .catch((err)=>{console.log(err,"connection err")})
      
      console.log(user, "found user")
      if (!user) {
        return {
          __typename:"loginError",
          emailError: `The user with the id ${Email} does not exist.`,
        };
      }
      console.log(Password, user.Password, jwt.decode(user.Password))
      const decodedPassword = await bcrypt.compare(Password, user.Password)
      console.log(decodedPassword, "this is decoded password")
      if (!decodedPassword){
        return {
          __typename:'loginError',
          passwordError:`Incorrect password`
        }
      }
      const Token = jwt.sign({_id:user._id, email:user.Email}, JWT_SECRET, {expiresIn:1})
      console.log(Token, "token")
      return {__typename:"privateData", UserId:user._id, Token:Token, TokenExpirationTime:1, Tag:user.Tag}
    } catch (err) {
      console.log(err,"try catch error")
    }
  },
}