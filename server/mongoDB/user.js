const mongoose = require('mongoose');

const usersDBSchema = new mongoose.Schema({
    Name: {type:String},
    Email: {type:String},
    Mobile:{type:String},
    Password: {type:String},
    Tag:{type:String},
    History:[{
        latitude:String,
        longitude:String,
        date:String,
        garageName:String,
        status:{
            status: String,
            enum : ['ORDER-PLACED','ORDER-CANCELED']
        },
        canceledBy:String
    },
    { timestamps: true }]
},
{
    timestamps: true,
});

const UsersDB = mongoose.model('usersDB', usersDBSchema)

module.exports = UsersDB