var mongoose = require('mongoose')
var NewsSchema = mongoose.Schema({
    particular: {
        type: String
    },
    designer: {
        type: String
    },
   image: {
        type: String
    },
    email:{
        type: String
    },
    brand: {
        type: String
    },
    date: {
        type: String,
        default: Date.now
    },
    description: {
        type: String
    }
})




var News = module.exports = mongoose.model('News', NewsSchema)
module.exports= News