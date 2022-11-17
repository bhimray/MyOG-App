const { buildSchema } = require('graphql');

module.exports = buildSchema(`
type Customer{
    latitude:String
    longitude:String
    date:String
    status:String
    canceledBy:String
    cancelReason:String
    FeedBack:String
}
input CustomerInput{
    latitude:String
    longitude:String
    date:String
    status:String
    canceledBy:String
    cancelReason:String
    FeedBack:String
}

type garageData{
    Name: String
    Owner: String
    Email: String
    Mobile: String
    Password: String
    ServiceType:[String]
    OpeningClosingTime:[String]
    Customer:[Customer]
}

input garageDataInput{
    Name: String
    Owner: String
    Email: String
    Mobile: String
    Password: String
    ServiceType:[String]
    OpeningClosingTime:[String]
    Customer:[CustomerInput]
}
type Status{
    status:String
}
type history{
    latitude:String
    longitude:String
    date:String
    garageName:String
    canceledBy:String
    status:[Status]
}
type userData{
    Name:String,
    Email:String,
    Mobile:String,
    Tag:String,
    History:[history]

}
input userLogin{
    Name:String,
    Email:String,
    Password:String,
}
input singleGarageInfo{
    garageName:String,
    garageId:String
}
type privateData{
    UserId:String,
    Token:String,
    TokenExpirationTime:String
}
input tuneDataInput{
    userEmail:String
    latitude:String
    logitude:String
}
type tuneData{
    userEmail:String
    latitude:String
    logitude:String
}

type RootQuery {
    
  userLogin(userLoginInput:userLogin):privateData
  garageLogin(garageLoginInput:userLogin):privateData
  userDetails(userLoginInput:userLogin):userData
  garageDetails(Tag:String):garageData
  singleGarageDetails(garageDetailsInput:singleGarageInfo):garageData
}

type RootMutation {
    googleAuth(google_credential:String):privateData
  createUser(userInput:userLogin):privateData
  createGarage(garageData:garageDataInput):garageData
  tuneAlarm(tuneData:tuneDataInput):tuneData
}


schema {
    query: RootQuery
    mutation: RootMutation
}
`);