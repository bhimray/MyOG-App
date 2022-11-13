const mongoose = require('mongoose');

const garageUsersSchema = new mongoose.Schema({
    Name: {type:String},
    Owner: {type:String},
    Email: {type:String},
    Mobile:{type:String},
    Password: {type:String},
    ServiceType:{type:Array},
    OpeningClosingTime:{type:Array},
    Customer:[{
        latitude:String,
        longitude:String,
        date:String,
        status:{
            status: String,
            enum : ['ORDER-PLACED','ORDER-CANCELED']
        },
        canceledBy:String,
        cancelReason:String,
        FeedBack:String
    },
    { timestamps: true }]
},
{
    timestamps: true,
});

const garageDB = mongoose.model('garageDB', garageUsersSchema)

module.exports = garageDB