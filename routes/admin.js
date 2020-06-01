var express = require('express');
var router = express.Router();
// const {
//     
//     forwardAuthenticated
// } = require('../handlers/auth')
var bcrypt = require('bcryptjs')
var passport = require('passport')
var localStrategy = require('passport-local').Strategy
var path = require('path')
var ordercontroller = require('../controllers/ordercontroller')



router.get('/',  ordercontroller.getJobs);
router.get('/index',  ordercontroller.getJob);
router.get('/order',  ordercontroller.getOrder)
router.get('/accounts',  ordercontroller.getAccount)



router.get('/:id',  ordercontroller.updateOrder)
router.post('/:id',  async (req, res) => {
    var body = req.body
    var status = req.body.status
    var progress = req.body.progress
    var update = {
        status: status,
        progress: progress
    }

    const orders = await Order.findByIdAndUpdate({
        _id: req.params.id
    }, {
        $set: update
    }, {
        new: true, // return the new store instead of the old one
        runValidators: true,
        upsert: true,
        returnOriginal: false,
        returnNewDocument: true
    }).exec();
    //   res.json([orders,body,status,progress])
    console.log(orders)
    res.redirect(`/${orders._id}`)
})

module.exports = router;