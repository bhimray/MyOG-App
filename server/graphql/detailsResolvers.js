const userData = require('../mongoDB/user')
const garageData = require('../mongoDB/garage')


module.exports = {
    garageDetails: async (args, req) => {
        const {Tag} = args.Tag
        console.log(args, "garage details query")
        const garages = garageData.find({Tag:Tag})
    },
    userDetails: async (args, req) => {

    },
    singleGarageDetails: async (args, req) => {

    },
}