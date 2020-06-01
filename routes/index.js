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
router.get('/',(req,res)=>{
    res.render('client/layout')
})
// router.route('/').get((req, res) => {
     
//   Order.find()
//      .then(orders => res.render('client/layout'))
//      .catch(err => res.status(400).json('Error: ' + err))
//   });
//   router.route('/user').get((req, res) => {
//     User.find()
//       .then(users => res.json(users))
//       .catch(err => res.status(400).json('Error: ' + err));
//   })
// router.route('/form').get((req, res) => {
//      res.json('HomePage')
//   });
// router.get('/order',(req, res) => {
//   Order.find()
//       .then(orders => res.json(orders))
//       .catch(err => res.status(400).json('Error: ' + err));
//   });
  

router.post('/order', (req, res,next) => {
  var name = req.body.name
    var email = req.body.email
    var particular = req.body.particular
    var pairs = req.body.pairs
    var size = req.body.size
    var designer = req.body.designer
    var brand = req.body.brand
    var sole = req.body.sole
    var description = req.body.description
    var progress = "0%"
    var status = 'unattended'
    var date =new  Date()
    var month = date.getMonth() + 1
    var year = date.getFullYear()
    if(req.body.sole=='single'){
      var price = 3700 * req.body.pairs
    }else{
      var price = 4700 * req.body.pairs
    }
    
   var newOrder = new Order({
       name,
       email,
       particular,
       pairs,
       size,
       sole,
       designer,
       brand,
       description,
       progress, 
       status,
       price,
       date,
       month,
       year
   })
   newOrder.save()
   .then(() => res.json('Order successfully!'))
   .catch(err => res.status(400).json('Error: ' + err));
})



module.exports = router;
