var mongoose = require('mongoose')

var OrderSchema = mongoose.Schema({
    name: {
        type: String,
        required:true
    },
    email: {
        type: String,
        required:true
    },
    particular: {
        type: String,
        required:true
    },
    pairs: {
        type: Number,
        required:true
    },
    
    size: {
        type: String,
        required:true
    },
    designer: {
        type: String,
        required:true
    },
    brand: {
        type: String,
        required:true
    },
                sole: {
                    type: String,
                    required:true
                },
     description:{
        type: String
    },
     progress:{
        type: String
    },
     status:{
        type: String
    },
     date:{
        type: Date
    },
     month:{
        type: Number
    },
     year:{
        type: Number
    },
    price:{
        type:Number
    }
})

OrderSchema.statics.getPrice = function () {
    return this.aggregate([
        {
            $group: {
                _id: null,
                totalPrice: {
                    $sum: '$price'
                }
            }
        }
    ])
}
var Order = mongoose.model('Order', OrderSchema)
module.exports = Order