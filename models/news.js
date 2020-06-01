var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/complexProject')
mongoose.Promise = global.Promise
var db = mongoose.connection
mongoose.Promise = global.Promise
var NewsSchema = mongoose.Schema({
    particular: {
        type: String
    },
    designer: {
        type: String
    },
   image: {
        type: Buffer
    },
    contentType:{
        type: String
    },
    path: {
        type: String
    },
    date: {
        type: String
    },
    description: {
        type: String
    }
})




var News = module.exports = mongoose.model('News', NewsSchema)
module.exports.createNews = function (newNews, callback) {
    newNews.save(callback)
}