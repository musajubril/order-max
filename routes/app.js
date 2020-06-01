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



module.exports= router