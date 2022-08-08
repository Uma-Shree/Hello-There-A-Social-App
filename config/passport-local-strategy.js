  const passport = require('passport');
  const LocalStrategy = require('passport-local').Strategy;
  const User = require('../models/user');

  //authentication using passport

  passport.use(new LocalStrategy({
          usernameField: 'email'
      },
      function(email, password, done) {
          //find user and establish identity

          User.findOne({ email: email }, function(err, user) {
              if (err) {
                  console.log('Error in finding user --> Passport');
                  return done(err);
              }
              if (!user || user.password != password) {
                  console.log('Invalid Username or Password');
                  return done(null, false);
              }

              return done(null, user);

          });

      }
  ));


  //serializing the user to decide which key is to be kept in the cookies

  passport.serializeUser(function(user, done) {
      done(null, user.id);
  });


  //deserializeUserfrom the key in the cookies

  passport.deserializeUser(function(id, done) {
      User.findById(id, function(err, user) {
          if (err) {
              console.log('Error in finding user --> passport');
              return (done(err));
          }

          return done(null, user);

      });
  });

  //check if the user is authenticated
  passport.checkAuthentication = function(req, res, next) {

      //if the user is signed in, then pass on the request to the next funciton(controller's action)
      if (req.isAuthenticated()) {
          return next();

      }
      // if the user is not signned in
      return res.redirect('/users/sign-in');

  }

  passport.setAuthenticatedUser = function(req, res, next) {
      if (req.isAuthenticated()) {
          //req.user contains the current signned in user from the session cookie and we are just sending th e user
          res.locals.user = req.user;
      }
      next();

  }


  module.exports = passport;