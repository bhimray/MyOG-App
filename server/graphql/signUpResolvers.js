const userData = require('../mongoDB/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const { userValidationError } = require('../errorHandler')
const mongoose = require('mongoose');
require('dotenv').config()
const MONGO_DB = process.env.MONGO_URI;
module.exports = {
  createUser: async (args, req) => {
    try{
      args.userInput.Password = await bcrypt.hash(args.userInput.Password, 12)
      console.log(args.userInput.Password, "hashed_password")
      const user = new userData(args.userInput)
      //
      mongoose.connect(MONGO_DB)
      const returnedUser = await user.save().then((res)=>{console.log(res,"user saved"); return res}).catch((err)=>err)
      // (err, user)=>{
      //   if (err){
      //     throw userValidationError(err);
      //   }else{
      //     console.log("user is saved")
      //     return user;
      //   }
      // })
      console.log("returned user", returnedUser)
      const Token = jwt.sign({_id:returnedUser._id, email:returnedUser.Email}, process.env.JWT_SECRET, {expiresIn:1})
      return {UserId:returnedUser._id, Token:Token, TokenExpirationTime:1}
    } catch (err){
      console.log(err)
    }
  },

  createGarage: async (args, req) => {
    console.log(args.garageData,args.garageData.Name,"args in create garage")
    try{
      args.garageData.Password = await bcrypt.hash(args.garageData.Password, 12)
      console.log(args.garageData.Password, "hashed_password")
      const user = new garageData(args.garageData)
      //
      mongoose.connect(MONGO_DB)
      user.save((err, user)=>{
        if (err){
          throw userValidationError(err);
        }else{
          console.log(user,"user is saved")
          return user;
        }
      })
      return user;
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