 const passport = require('passport');
 const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
 const crypto = require('crypto');
 const User = require('../models/user');


 //tell passport to use a new strategy for google login
 passport.use(new googleStrategy({
         clientID: "515851840531-ol591gv0jgcu698n8otokj94ddbckpfm.apps.googleusercontent.com",
         clientSecret: "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",
         callbackURL: "http://localhost:8000/users/auth/google/callback",
     },

     function(accessToken, refreshToken, profile, done) {
         //find a user
         User.findOne({ email: profile.emails[0].value }).exec(function(err, user) {
             if (err) { console.log('error in google strategy-passport', err); return; }
//pritn the token or refresh token
console.log(accessToken,refreshToken);
             console.log(profile);
             //if found ,set this user as req.user
             if (user) {
                 return done(null, user);

                 //if not found , set this user as req.user
             } else {
                 User.create({
                     name: profile.displayName,
                     email: profile.emails[0].value,
                     password: crypto.randomBytes(20).toString('hex')
                 }, function(err, user) {
                     if (err) { console.log('error in creating user google strategy-passport', err); return; }
                 });
             }
         });

     }));


 module.exports = passport;