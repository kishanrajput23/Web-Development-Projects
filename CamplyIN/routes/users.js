// imports
const express = require('express');
const passport = require('passport');
const router = express.Router();
const userControls = require('../controllers/users');
const { requireLogIn } = require('../utils/middleware.js');
const catchAsync = require('../utils/catchAsync.js');

//catchAsync -> check for errors, if there is an error it is passed it to the next
//then in app.js their are error handler route, so they render error.ejs to display error (views/campground/error.ejs)
//catchAsync is present in utils directory
router.route('/register')
    .get(userControls.registerForm)
    .post(catchAsync(userControls.registerUser));

router.route('/login')
    .get(userControls.loginForm)
    //passport.authenticate -> it is a middleware
    //first parameter -> provide strategy, like how to authenticate (local or google or twitter etc.)
    //second parameter -> provide options in objects.
    //failureFlash -> flash a msg automatically
    //failureRedirect -> if things go wrong, redirect to login
    .post(
        // If passport.authenticate() succeeds, the next handler will be invoked 
        // and the req.user property will be set to the authenticated user.
        passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }),
        userControls.loginUser
    );

router.get('/logout', userControls.logoutUser);

router.get('/mycampgrounds', requireLogIn, userControls.userCampgrounds);

module.exports = router;