// imports
const express = require('express');
const router = express.Router();
const campControls = require('../controllers/campgrounds')
const { requireLogIn, isCampAuthor, validateCamp } = require('../utils/middleware.js');
const catchAsync = require('../utils/catchAsync.js');
//for uploading files
const multer = require('multer');
//destination of our upload is cloudinary
//storing files in 'storage' -> (path: cloudinary/index.js)
const { storage } = require('../cloudinary');
const upload = multer({ storage });

const Campground = require('../models/campground');

//router.route -> defines single route which can handle different routes of same path

router.route('/')
    //catchAsync -> check for errors, if there is an error it is passed it to the next
    //then in app.js their are error handler route, so they render error.ejs to display error (views/campground/error.ejs)
    //catchAsync is present in utils directory
    .get(catchAsync(campControls.index))
    //validateCampground -> it is js validator tool, automatic validate data entered by user on server side
    //here validateCampground is used as an middleware

    //upload.array -> used for image upload.
    //multer parse the form info and stores the file in multipart/form-data
    .post(requireLogIn, upload.array('image'), validateCamp, catchAsync(campControls.createCamp));

router.get('/new', requireLogIn, campControls.newForm);

router.get('/search', catchAsync(campControls.search));

router.route('/:id')
    //catchAsync -> check for errors, if there is an error it is passed it to the next
    //then in app.js their are error handler route, so they render error.ejs to display error (views/campground/error.ejs)
    //catchAsync is present in utils directory
    .get(catchAsync(campControls.showCamp))
    //validateCampground -> it is js validator tool, automatic validate data entered by user on server side
    //here validateCampground is used as an middleware
    .put(requireLogIn, isCampAuthor, upload.array('image'), validateCamp, catchAsync(campControls.updateCamp))
    //upload.array -> used for image upload.
    //multer parse the form info and stores the file in multipart/form-data
    .delete(requireLogIn, isCampAuthor, catchAsync(campControls.deleteCamp));

router.get('/:id/edit', requireLogIn, isCampAuthor, catchAsync(campControls.editForm));


module.exports = router;

//isLoggedIn -> it is a middleware, checks wheather a user is loggedIn or not.
//it uses authentication (passport npm).
//path -> middleware.js

//isAuthor -> it is a middleware, stores author or owner of campground.