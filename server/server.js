const express = require('express')
const app = express();

// middlewareconst express = require('express')
const bodyParser = require('body-parser')
const {graphqlHTTP} = require('express-graphql')
const mongoose = require('mongoose')
require('dotenv').config()



const MONGO_DB = process.env.MONGO_URI;
const port = process.env.PORT || 5000;

const graphqlSchema = require('./graphql/graphql-schema')
const graphqlResolver = require('./graphql/resolvers/graphql-resolver')

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
graphqlHTTP({
    schema:graphqlSchema,
    rootValue:graphqlResolver,
    graphiql:true
}))
app.listen(port, (err)=>{console.log("server is listening"); if (err) console.log(err, "==== error occurred")})
app.use(express.json())


app.listen(port, () =>console.log("server is listening"))