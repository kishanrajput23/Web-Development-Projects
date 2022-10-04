// config
if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

const port = process.env.PORT || 8080;

// import modules
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
const morgan = require('morgan');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const LocalPassport = require('passport-local');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const MongoStore = require('connect-mongo');

// express app
const app = express();

//import models
const User = require('./models/user');

//import utilities
const ExpressError = require('./utils/ExpressError.js');
const {
    scriptSrcUrls,
    styleSrcUrls,
    connectSrcUrls,
    fontSrcUrls
} = require('./utils/cspUrls.js');

// import routes 
const campgroundRoutes = require('./routes/campgrounds');
const reviewRoutes = require('./routes/reviews');
const userRoutes = require('./routes/users');

// connect mongoose to mongodb
const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/yelp-camp';
// const dbUrl = 'mongodb://localhost:27017/yelp-camp'
mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})
    .then(() => console.log('Database Connected!'))
    .catch(err => console.log('Mongoose Connection Error:', err));

// ejs-mate
app.engine('ejs', ejsMate);

// setup EJS
app.set('view engine', 'ejs');

// directories
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

// parse req.body from a form POST request
app.use(express.urlencoded({
    extended: true
}));

// method override for put / delete request
app.use(methodOverride('_method'));

// replace prohibited characters with _ for security
app.use(mongoSanitize({
    replaceWith: '_'
}));

// basic security
app.use(helmet());
app.use(
    helmet.contentSecurityPolicy({
        directives: {
            defaultSrc: [],
            connectSrc: ["'self'", ...connectSrcUrls],
            scriptSrc: ["'unsafe-inline'", "'self'", ...scriptSrcUrls],
            styleSrc: ["'self'", "'unsafe-inline'", ...styleSrcUrls],
            workerSrc: ["'self'", "blob:"],
            objectSrc: [],
            imgSrc: [
                "'self'",
                "blob:",
                "data:",
                "https://res.cloudinary.com/da5s7v124/", // own cloudinary account
                "https://images.unsplash.com/"
            ],
            fontSrc: ["'self'", ...fontSrcUrls],
        },
    })
);

// Morgan
app.use(morgan('tiny'));

// Express Session & Mongo Store
const secret = process.env.SECRET || 'yourdeepestdarkestsecret';
const store = new MongoStore({
    mongoUrl: dbUrl,
    secret,
    touchAfter: 24 * 60 * 60 //24 hours
});
store.on('error', e => {
    console.log('SESSION STORE ERROR', e);
});
const sessionConfig = {
    store: store,
    name: 'session',
    secret,
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        // secure: true,
        // session expires in 8 days:
        expires: Date.now() + 1000 * 60 * 60 * 24 * 8,
        maxAge: 1000 * 60 * 60 * 24 * 8
    }
}
app.use(session(sessionConfig));

app.use(flash()); // flash middleware

// PASSPORT.js
app.use(passport.initialize());
app.use(passport.session()); // supports persistent login sessions

// Using static methods brought to us by passport-local-mongoose:
// use static authenticate method of User model in LocalStrategy
passport.use(new LocalPassport(User.authenticate()));
// use static serialize and deserialize of User model for passport session support
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    // console.log( 'From main app:', req.query );
    res.locals.currentUser = req.user;
    console.log("User: ", res.locals.currentUser);
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})

// Home Page
app.get('/', (req, res) => {
    res.render('home');
});

// Express Router
app.use('/', userRoutes);
app.use('/campgrounds', campgroundRoutes);
app.use('/campgrounds/:id/reviews', reviewRoutes)

// 404
app.all('*', (req, res, next) => {
    next(new ExpressError(404, 'Page Not Found'));
});

// simple error handler
app.use((err, req, res, next) => {
    if (!err.status) err.status = 400;
    if (!err.message) err.message = 'Something went wrong';
    res.render('error', {
        err
    });
});

app.listen(port, () => {
    console.log(`Server's open on port ${port}!`);
});




// if (process.env.NODE_ENV !== "production") {
//     require('dotenv').config();
// }

// const express = require('express');
// const path = require('path');
// const mongoose = require('mongoose');
// const ejsMate = require('ejs-mate'); //adds boilerplate code view/layouts/boilerplate.ejs
// const session = require('express-session'); //store cookies in browser
// const flash = require('connect-flash'); //display flash message
// const ExpressError = require('./utils/ExpressError'); //error handler
// const methodOverride = require('method-override'); //for patch put and delete route
// const passport = require('passport'); //for authentication
// const LocalStrategy = require('passport-local'); //for authentication
// const User = require('./models/user');
// const helmet = require('helmet'); //for security
// const mongoSanitize = require('express-mongo-sanitize'); //for security, prevent writing queries by hacker
// //routes (CRUD operation)
// const userRoutes = require('./routes/users');
// const campgroundRoutes = require('./routes/campgrounds');
// const reviewRoutes = require('./routes/reviews');

// //nmp for connecting to the database
// const MongoStore = require('connect-mongo');

// //database url
// const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/yelp-camp';

// //connecting to Database
// mongoose.connect(dbUrl);

// //check if there is an error connecting to Database print 'error message' else print 'Database connected'
// const db = mongoose.connection;
// db.on("error", console.error.bind(console, "connection error:"));
// db.once("open", () => {
//     console.log("Database connected");
// });

// const app = express();

// app.engine('ejs', ejsMate)

// // set a value for the 'view engine' config option.
// // The value is the name of the template engine module we installed. That’s 'ejs'.
// app.set('view engine', 'ejs');

// //set value of views directory which is 'views
// app.set('views', path.join(__dirname, 'views'))

// //use to parse the body
// app.use(express.urlencoded({ extended: true }));
// //for patch put and delete route
// app.use(methodOverride('_method'));
// //Serving up a Static Directory
// //The call to path.join allows you to manipulate a path by providing individual path segments. It starts
// // with __dirname which is the directory path for the current script. From there, the second
// // segment moves out of the src folder and into the public directory.
// app.use(express.static(path.join(__dirname, 'public')))
// app.use(mongoSanitize({
//     replaceWith: '_'
// }))

// //A secret message for cookies
// const secret = process.env.SECRET || 'thisshouldbeabettersecret!';

// const store = MongoStore.create({
//     mongoUrl: dbUrl,
//     touchAfter: 24 * 60 * 60,
//     crypto: {
//         secret: secret
//     }
// });

// store.on("error", function (e) {
//     console.log("SESSION STORE ERROR", e)
// })

// //storing cookies in broweser
// const sessionConfig = {
//     store,
//     name: 'session',
//     secret,
//     resave: false,
//     saveUninitialized: true,
//     cookie: {
//         //adding more security
//         httpOnly: true,
//         // secure: true,
//         expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
//         maxAge: 1000 * 60 * 60 * 24 * 7
//     }
// }

// //for cookies -> use to store cookies in browser.
// app.use(session(sessionConfig));
// //for flash -> use to display flash messages.
// app.use(flash());
// //enable all middleware comes with helmet
// app.use(helmet());


// const scriptSrcUrls = [
//     "https://stackpath.bootstrapcdn.com",
//     "https://api.tiles.mapbox.com",
//     "https://api.mapbox.com",
//     "https://kit.fontawesome.com",
//     "https://cdnjs.cloudflare.com",
//     "https://cdn.jsdelivr.net",
// ];
// const styleSrcUrls = [
//     "https://kit-free.fontawesome.com",
//     "https://stackpath.bootstrapcdn.com",
//     "https://api.mapbox.com",
//     "https://api.tiles.mapbox.com",
//     "https://fonts.googleapis.com",
//     "https://use.fontawesome.com",
// ];
// const connectSrcUrls = [
//     "https://api.mapbox.com",
//     "https://*.tiles.mapbox.com",
//     "https://events.mapbox.com",
// ];
// const fontSrcUrls = [];
// app.use(
//     helmet.contentSecurityPolicy({
//         directives: {
//             defaultSrc: [],
//             connectSrc: ["'self'", ...connectSrcUrls],
//             scriptSrc: ["'unsafe-inline'", "'self'", ...scriptSrcUrls],
//             styleSrc: ["'self'", "'unsafe-inline'", ...styleSrcUrls],
//             workerSrc: ["'self'", "blob:"],
//             childSrc: ["blob:"],
//             objectSrc: [],
//             imgSrc: [
//                 "'self'",
//                 "blob:",
//                 "data:",
//                 "https://res.cloudinary.com/da5s7v124/", //SHOULD MATCH YOUR CLOUDINARY ACCOUNT!
//                 "https://images.unsplash.com",
//             ],
//             fontSrc: ["'self'", ...fontSrcUrls],
//         },
//     })
// );

// //Authentication
// //for initializing passport
// app.use(passport.initialize());
// //for persistent login session
// app.use(passport.session());
// //use local strategy such that the auth methord is going to located on user model
// passport.use(new LocalStrategy(User.authenticate()));

// //it tells passport how to serialize a user.
// //it reffers to how do we store user in the seasson
// passport.serializeUser(User.serializeUser());
// //it tells passport how to deserialize a user.
// //it reffers to how do we get a user out of the sesson
// passport.deserializeUser(User.deserializeUser());

// //display flash message
// app.use((req, res, next) => {
//     res.locals.currentUser = req.user;
//     //for success, display success flash message.
//     res.locals.success = req.flash('success');
//     //for error, display error flash message.
//     res.locals.error = req.flash('error');
//     next();
// })

// //calling routes
// app.use('/', userRoutes);
// app.use('/campgrounds', campgroundRoutes)
// app.use('/campgrounds/:id/reviews', reviewRoutes)

// //home route
// app.get('/', (req, res) => {
//     // rendering the template.
//     //This is done by defining a new route and calling
//     // res.render with the template name. The “.ejs file extension (home) can be left off (or called). The second
//     // argument is an object that contains all the variables the template should have access to
//     // when rendering.
//     res.render('home')
// });

// //error handler
// //when a new ExpressError is thrown it passes to the next, we get it from fxn parameter
// //then->
// app.all('*', (req, res, next) => {
//     //a new express error will be created and passsed to next (displayed)
//     next(new ExpressError('Page Not Found', 404))
// })

// app.use((err, req, res, next) => {
//     const { statusCode = 500 } = err;
//     if (!err.message) err.message = 'Oh No, Something Went Wrong!'
//     //statusCode will be 500 and error.ejs will be rendered
//     res.status(statusCode).render('error', { err })
// })

// //starting the server on mongoDB or on localhost:3000
// const port = process.env.PORT || 3000;
// app.listen(port, () => {
//     console.log(`Serving on port ${port}`)
// })