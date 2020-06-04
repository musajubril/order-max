var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs')
var passport = require('passport')
var localStrategy = require('passport-local').Strategy
var path = require('path')
var Order = require('../models/order')
var News = require('../models/news')
// Load Client model
const {  ensureAuthenticate,forwardClient } = require('../handlers/auth');
const jwt = require('jsonwebtoken')
const Client = require('../models/Client');
const key = process.env.SECRET_KEY || 'secret'
// Login Page
router.get('/login',  forwardClient,(req, res) => res.render('client/login'));

// Register Page
router.get('/register',  forwardClient,(req, res) => res.render('client/register'));

// Register
router.post('/register', (req, res) => {
  const { name, email, password, password2 } = req.body;
  let errors = [];

  if (!name || !email || !password || !password2) {
    errors.push({ msg: 'Please enter all fields' });
  }

  if (password != password2) {
    errors.push({ msg: 'Passwords do not match' });
  }

  if (password.length < 6) {
    errors.push({ msg: 'Password must be at least 6 characters' });
  }

  if (errors.length > 0) {
    res.render('client/register', {
      errors,
      name,
      email,
      password,
      password2
    });
  } else {
    Client.findOne({ email: email }).then(client => {
      if (client) {
        errors.push({ msg: 'Email already exists' });
        res.render('client/register', {
          errors,
          name,
          email,
          password,
          password2
        });
      } else {
        const newClient = new Client({
          name,
          email,
          password
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newClient.password, salt, (err, hash) => {
            if (err) throw err;
            newClient.password = hash;
            newClient
              .save()
              .then(client => {
                res.redirect('/client/login');
              })
              .catch(err => console.log(err));
          });
        });
      }
    });
  }
});

// Login
// router.post('/login',(req,res)=>{
//   Client.findOne({email:req.body.email})
//       .then(client=>{
//           if(client){
//               if(bcrypt.compareSync(req.body.password, client.password)){
//                   const payload = {
//                       _id : client._id,
//                       name: client.name,
//                       email: client.email
//                   }
//                   let token = jwt.sign(payload, key,{
//                       expiresIn: 86400
//                   })
//                   // module.exports = token
//                   res.redirect('/client')
//               }else{
//                   res.json({error: 'Client does not exist'})
//               }
//           }else{
//               res.json({error: 'Client does not exist'})
//           }
//       })
//       .catch(err=>{
//           res.send('error' + err)
//       })
// });
router.post('/login', (req, res, next) => {
  passport.authenticate('client-local', {
    successRedirect: '/client',
    failureRedirect: '/client/login'
  })(req, res, next);
});
// Logout
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/client/login');
});
router.get('/',async(req,res)=>{
  // var decode = jwt.verify(req.headers['authorization'], key)
  var orders =await Order.find()
  var len = orders.length
  var newsfeeds = await News.find()
    res.render('client/layout',{orders,len,newsfeeds})
})
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
