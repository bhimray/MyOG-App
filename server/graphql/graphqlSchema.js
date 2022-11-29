const { buildSchema } = require('graphql');

module.exports = buildSchema(`

type garageDataError{
    message:String
}
type loginError {
    emailError: String
    passwordError:String
}
type UserNotFoundError{
    messsage:String
}
  
type Customer{
    name:String
    latitude:String
    longitude:String
    date:String
    status:String
    canceledBy:String
    canceledReason:String
    FeedBack:String
}
input CustomerInput{
    name:String
    latitude:String
    longitude:String
    date:String
    status:String
    canceledBy:String
    canceledReason:String
    FeedBack:String
}
type latlngType{
    lat:String
    lng:String
}
type garageData{
    _id:String
    Photo:[String]
    ProfilePhoto:String
    Name: String
    GarageName: String
    Email: String
    Mobile: String
    Address:String
    About:String
    GeoCode:[Float]
    ServiceType:String
    OpeningClosingTime:[String]
    OverallRatings:String
    Customer:[Customer]
}
input latlng{
    lat:String
    lng:String
}
input garageDataInput{
    Tag:String
    Photo:[String]
    ProfilePhoto:[String]
    FullName: String
    GarageName: String
    Email: String
    Mobile: String
    Address:String
    About:String
    GeoCode:[Float]
    Password: String
    ServiceType:String
    OCTime:[String]
    OverallRatings:String
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
    Name:String
    Email:String
    Mobile:String
    Tag:String
    History:[history]
}

input userLogin{
    Number:String
    Name:String
    Email:String
    Password:String
}
input singleGarageInfo{
    garageName:String
    garageId:String
}
type privateData{
    Tag:String
    UserId:String
    Token:String
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
type garageArray{
    garages:[garageData]
}
union garageInfo = garageArray | garageDataError
union userInfo = userData | UserNotFoundError
union loginInfo = loginError | privateData 

type RootQuery {
    userDetails(userLoginInput:userLogin):userInfo
    garageFilteration(Tag:String):garageInfo
    garageProfile(UserId:String):garageData
    singleGarageDetails(garageDetailsInput:singleGarageInfo):userInfo
}

type RootMutation {
    garageLogin(garageLoginInput:userLogin):loginInfo
    userLogin(userLoginInput:userLogin):loginInfo
    googleAuth(google_credential:String):privateData
    createUser(userInput:userLogin):privateData
    createGarage(garageData:garageDataInput):privateData
    tuneAlarm(tuneData:tuneDataInput):tuneData
}


schema {
    query: RootQuery
    mutation: RootMutation
}
`);