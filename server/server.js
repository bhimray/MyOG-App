const express = require('express')
const app = express();
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser') 
// middlewareconst express = require('express')
const bodyParser = require('body-parser')
const {graphqlHTTP} = require('express-graphql')
const mongoose = require('mongoose')
require('dotenv').config()

const MONGO_DB = process.env.MONGO_URI;
const port = process.env.PORT || 5000;

const graphqlSchema = require('./graphql/graphqlSchema')
const graphqlResolver = require('./graphql/graphqlResolvers')

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
    customFormatErrorFn:err=>{
      try{
        err.details = JSON.parse(err.message)//converting error in object from JSON
        err.message = Array.isArray(err.details.error)? err.details.error.join(",") : err.details.error;//checking if the error is array or not
        return err; // return error to the front-end
      }catch{
        return err; // cathing the err caused during try{}
      }
    },
  graphiql:true,

}))
app.listen(port, (err)=>{console.log("server is listening"); if (err) console.log(err, "=== error occurred")})
