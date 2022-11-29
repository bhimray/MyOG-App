const userData = require('../mongoDB/user')
const garageData = require('../mongoDB/garage')
const mongoose = require("mongoose")
const MONGO_DB =  "mongodb+srv://Bilen:GYADAV12@cluster0.xz35uix.mongodb.net/?retryWrites=true&w=majority";

module.exports = {
    garageProfile: async (args, req) => {
        const id= args.UserId
        console.log(args, "garage details query")
        await mongoose.connect(MONGO_DB)
        const garages = await garageData.findById(id).then((res)=>{ console.log(res);return res})
        console.log(garages)
        return garages;
    },
    userDetails: async (args, req) => {

    },
    garageFilteration: async (args, req) => {
        
        await mongoose.connect(MONGO_DB);
        console.log("finding garage data for card");
        if (!args){
            console.log(args.Tag);
            const garages = await garageData.find(filter({ Tag: { $eq: args.Tag } }))
            .then((res)=>{console.log(res); return res})
            return garages;
        }
        const garages = await garageData.find().then((res)=>{
            return res
        });
        console.log(garages,"garages")
        const garry = {__typename:'garageArray', garages}
        console.log(garry, "garry----")
        return garry;
    },
    
}