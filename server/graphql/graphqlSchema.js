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
Input userLogin{
    Name:String,
    Email:String,
    Password:String,
}
Input singleGarageInfo{
    garageName:String,
    garageId:String
}
type privateData{
    Email:String,
    Token:String,
    TokenExpirationTime:String
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
  createUser(userInput:userLogin):privateData
  createGarage(gargeData:garageData):garageData
  tuneAlarm(tuneData:tuneData):tuneData
}


schema {
    query: RootQuery
    mutation: RootMutation
}
`);