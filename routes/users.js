const express = require('express');
const router = express.Router();
const passport = require('passport');


const usersController = require('../controllers/users_controller');

//here i modified
router.get('/profile/:id', passport.checkAuthentication, usersController.profile);
router.post('/update/:id', passport.checkAuthentication, usersController.update);
router.get('/profile', usersController.profile);

router.get('/sign-up', usersController.signUp);
router.get('/sign-in', usersController.signIn);

router.post('/create', usersController.create);

//edited get to post
router.get('/sign-out', usersController.destroySession);


//use passport as a middleware to authenticate
router.post('/create-session', passport.authenticate('local', {
    failureRedirect: '/users/sign-in'
}, ), usersController.createSession);



module.exports = router;