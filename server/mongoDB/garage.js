const mongoose = require('mongoose');

const garageUsersSchema = new mongoose.Schema({
    Tag:{type:String},
    Photo:{type:Array},
    Profile:{type:String},
    About:{type:String},
    FullName: {type:String},
    GarageName: {type:String},
    Email: {type:String},
    Mobile:{type:String},
    Address:{type:String},
    GeoCode:{type:Array},
    Password: {type:String},
    ServiceType:{type:String},
    OCTime:{type:Array},
    OverallRatings:{type:String},
    Customer:[{
        name:String,
        latitude:String,
        longitude:String,
        date:String,
        status:{
            type: String,
            enum : ['ORDER-COMPLETE','ORDER-CANCELED']
        },
        canceledBy:String,
        canceledReason:String,
        FeedBack:String
    },
    { timestamps: true }]
},
{
    timestamps: true,
});

const garageDB = mongoose.model('garageDB', garageUsersSchema)

module.exports = garageDB