const mongoose = require('mongoose');
// const WorkDetailsDB = require('./workDetailsDB');

const usersDBSchema = new mongoose.Schema({
    Name: {type:String},
    Email: {type:String},
    Mobile:{type:String},
    Password: {type:String},
    Tag:{type:Array},
    History:[{
        latitude:String,
        longitude:String,
        date:String,
        garageName:String,
        status:{
            canceledBy:String,
            type: String,
            enum : ['ORDER-PLACED','ORDER-CANCELED']
        },
    },
    { timestamps: true }]
},
{
    timestamps: true,
});

const UsersDB = mongoose.model('usersDB', usersDBSchema)

module.exports = UsersDB