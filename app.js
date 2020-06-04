const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const path = require('path')
const app = express();
const session = require('express-session')
const uri = process.env.ATLAS_URI || 'mongodb://localhost/mernOrder'
// require('./handlers/Admin')(passport)
require('./handlers/User')(passport)
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, 'public')));
mongoose.connect(uri, {useNewUrlParser: true,
  useCreateIndex:true,
   useUnifiedTopology:true,
   useFindAndModify: false
 })
const connection = mongoose.connection
connection.once('open', ()=>{
 console.log('MongoDB database connected succesfully')
})

// EJS
// app.use(EJS);

// Express body parser
app.use(express.urlencoded({ extended: true }));

// Express session
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);
// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.get('/',(req,res)=>{
  res.render('home')
})
// Routes
app.use('/client', require('./routes/index.js'));
app.use('/admin', require('./routes/admin.js'));

const PORT = process.env.PORT || 4000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
