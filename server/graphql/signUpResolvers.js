const userData = require('../mongoDB/user')
const garageData = require('../mongoDB/garage')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const { userValidationError } = require('../errorHandler')
const mongoose = require('mongoose');
require('dotenv').config()
const JWT_SECRET="HElloBimlenDra@Gy@DaV12&bilenMYlastNaMe"
const MONGO_DB =  "mongodb+srv://Bilen:GYADAV12@cluster0.xz35uix.mongodb.net/?retryWrites=true&w=majority";
module.exports = {
  createUser: async (args, req) => {
    try{
      console.log(args.userInput.Password, "++++++++++++++password+++++")
      args.userInput.Password = await bcrypt.hash(args.userInput.Password, 12)
      console.log(args.userInput.Password, "hashed_password")
      const user = new userData(args.userInput)
      //
      mongoose.connect(MONGO_DB)
      const returnedUser = await user.save().then((res)=>{console.log(res,"user saved"); return res}).catch((err)=>err)
     
      console.log("returned user", returnedUser)
      const Token = jwt.sign({_id:returnedUser._id, email:returnedUser.Email}, JWT_SECRET, {expiresIn:1})
      return {UserId:returnedUser._id, Token:Token, TokenExpirationTime:1}
    } catch (err){
      console.log(err)
    }
  },

  createGarage: async (args, req) => {
    console.log(args,args.garageData,args.garageData.FullName,"args in create garage")
    try{
      args.garageData.Password = await bcrypt.hash(args.garageData.Password, 12)
      console.log(args.garageData.Password, "hashed_password")
      const user = new garageData(args.garageData)
      //
      mongoose.connect(MONGO_DB)
      const returnedUser = await user.save().then((res)=>{return res}).catch((err)=>{console.log(err, "error occurred")})
      console.log("returned user", returnedUser)
      const Token = jwt.sign({_id:returnedUser._id, email:returnedUser.Email}, JWT_SECRET, {expiresIn:1})
      return {UserId:returnedUser._id, Token:Token, TokenExpirationTime:1}

    } catch (err){
      console.log(err)
    }

    // return await (async ()=> await mongoose.connect(MONGO_DB).then(()=>user.save((err, user)=>{
    //   if (err){
    //     throw userValidationError(err);
    //   }else{
    //     console.log("user is saved")
    //     return user;
    //   }
    // })))()
    //
    // await mongoose.connect(MONGO_DB).then(()=>{user.save((err, user)=>{
    //   if (err){
    //     throw userValidationError(err)
    //   }else{
    //     console.log("user is returned")
    //     return user;
    //   }
    //   }
    // )
    // }).catch((err)=>{return `${err} catchh err while connecting to save garage`})
},
}