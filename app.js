var express = require('express');
var path = require('path');
var multer = require('multer')
var bcrypt = require('bcryptjs')
var passport = require('passport')
var localStrategy = require('passport-local').Strategy
var mongo = require('mongodb')
var mongoose = require('mongoose')
const errorHandlers = require('./handlers/errorHandlers');
var app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize())
app.use(passport.session())
app.use('/', require('./routes/index.js'));
app.use('/admin', require('./routes/admin.js'))
const uri = process.env.ATLAS_URI || 'mongodb://localhost/mernOrder'
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex:true, useFindAndModify:false,
useUnifiedTopology:true})
const connection = mongoose.connection
connection.once('open', ()=>{
    console.log('MongoDB database connected succesfully')
})
var port = process.env.PORT || 5000
const server = app.listen(port, ()=>{
  console.log(`server is runnig on port: ${server.address().port}`)
})
module.exports = app;
