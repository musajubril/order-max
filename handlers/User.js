const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

// Load User model
const User = require('../models/User');
const Client = require('../models/Client');

module.exports = function(passport) {
  passport.use('user-local', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password' // this is the virtual field on the model
  },
  function(email, password, done) {
    User.findOne({
      email: email
    }, function(err, user) {
      if (err) return done(err);

      if (!user) {
        return done(null, false, {
          message: 'This email is not registered.'
        });
      }
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) throw err;
        if (isMatch) {
          return done(null, user);
        } else {
          return done(null, false, { message: 'Password incorrect' });
        }
    });
  }
)}))

  // add other strategies for more authentication flexibility
  passport.use('client-local', new LocalStrategy({
          usernameField: 'email',
          passwordField: 'password' // this is the virtual field on the model
      },
      function(email, password, done) {
          Client.findOne({
            email: email
          }, function(err, client) {
              if (err) return done(err);

              if (!client) {
                  return done(null, false, {
                      message: 'This email/username is not registered.'
                  });
              }
              bcrypt.compare(password, client.password, (err, isMatch) => {
                if (err) throw err;
                if (isMatch) {
                  return done(null, client);
                } else {
                  return done(null, false, { message: 'Password incorrect' });
                }
              // return done(null, client);
          });
      }
  )}));

  passport.serializeUser(
    (user, done)=> {
    done(null, user.id);
  }
  );
  passport.serializeUser(
    (client, done)=> {
    done(null, client.id);
  }
  );
  // passport.serializeUser(function(user, done) {            
  //   if (isUser(user)) {
  //     // serialize user
  //   } else if (isClient(user)) {
  //     // serialize company
  //   }
  // });
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
    Client.findById(id, function(err, client) {
      done(err, client);
    });
  });
  
};


