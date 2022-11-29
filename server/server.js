const express = require('express')
const app = express();
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser') 
const bodyParser = require('body-parser')
const {graphqlHTTP} = require('express-graphql')
const mongoose = require('mongoose')
require('dotenv').config()

const MONGO_DB = "mongodb+srv://Bilen:GYADAV12@cluster0.xz35uix.mongodb.net/?retryWrites=true&w=majority";
const port = process.env.PORT || 5000;

const graphqlSchema = require('./graphql/graphqlSchema')
const graphqlResolver = require('./graphql/graphqlResolvers');
const loginResolvers = require('./graphql/loginResolvers');

async function run() {
    // Create a new connection and connect to MongoDB...
    const conn = await mongoose.
      createConnection(MONGO_DB).
      asPromise().then((res)=>{
        console.log("server is connected", res.models)
      }).catch((err)=>{
        console.log("Failed to connect the server", err)
      })
    console.log("mongodb is connected")
  }
  run()

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

app.use('/',
  // bodyParser.json(),
  // cookieParser(),
  // (req, next)=>{
  //   try{
  //     const {userId} = jwt.verify(req.cookies.id, process.env.JWT_SECRET);
  //     req.userId = userId;
  //   } catch (err) {
  //     console.log(err)
  //   }
  // },
  graphqlHTTP({
    // context:{res, userId:req.userId},
    schema:graphqlSchema,
    rootValue:graphqlResolver,
    // typeResolver:()=>{
    //   loginInfo: {
    //     __resolveType: (parameter, context, info) => {
    //       console.log("==============resolving union types==============")
    //       // return username ? 'User' : 'Surface'
    //       if (parameter.Token) {
    //         return 'privateData';
    //       }else{
    //         return 'loginError'
    //       }
    //     }
    //   }
    // },
    customFormatErrorFn:err=>{
      try{
        err.details = JSON.parse(err.message)//converting error in object from JSON
        err.message = Array.isArray(err.details.error)? err.details.error.join(",") : err.details.error;//checking if the error is array or not
        console.log("error occurred", err)
        return err; // return error to the front-end
      }catch{
        console.log("error here", err)
        return err; // cathing the err caused during try{}
      }
    },
  graphiql:true,

}))
app.listen(port, (err)=>{console.log("server is listening"); if (err) console.log(err, "=== error occurred")})
