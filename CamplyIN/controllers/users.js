const User = require('../models/user');
const Campground = require('../models/campground');
const { capitalize } = require('../utils/functions');

module.exports.registerForm = (req, res) => {
    res.render('users/register');
}

module.exports.registerUser = async (req, res) => {
    try {
        const { email, username, password } = req.body;
        const user = new User({ email, username });

        // register() - convenience method to register a new user instance with a given password. Checks if username is unique. [passport-local-mongoose]
        const registeredUser = await User.register(user, password);
        // console.log(registeredUser);

        req.login(registeredUser, err => {
            if (err) return next(err);
            req.flash('success', `Welcome to YelpCamp, ${capitalize(username)}!`);
            res.redirect('/campgrounds');
        });
    }
    catch (err) {
        req.flash('error', err.message);
        res.redirect('register');
    }
};

module.exports.loginForm = (req, res) => {
    res.render('users/login');
};

module.exports.loginUser = (req, res) => {
    req.flash('success', `Welcome back, ${capitalize(req.user.username)}!`);
    const redirectUrl = req.session.returnTo || '/campgrounds';
    res.redirect(redirectUrl);
};

module.exports.logoutUser = (req, res) => {
    req.logout();
    req.flash('success', "Goodbye!");
    res.redirect('/campgrounds');
};

module.exports.userCampgrounds = async (req, res) => {
    let id = res.locals.currentUser._id;
    // console.log( id );
    const campgrounds = (await Campground.find({ author: { $in: id } })).reverse();
    res.render('users/campgrounds.ejs', { campgrounds })
}




// const User = require('../models/user');

// module.exports.renderRegister = (req, res) => {
//     res.render('users/register');
// }

// module.exports.register = async (req, res, next) => {
//     try {
//         //getting data from user
//         const { email, username, password } = req.body;
//         //creating new user
//         const user = new User({ email, username });
//         //it takes user and password, then it hash the pasword and store it in new user
//         const registeredUser = await User.register(user, password);
//         //when a user register it is automatically loggedIn
//         req.login(registeredUser, err => {
//             //if there is a error
//             if (err) return next(err);
//             //display success message and ->
//             req.flash('success', 'Welcome to Yelp Camp!');
//             //redirect to campground
//             res.redirect('/campgrounds');
//         })
//     } catch (e) {
//         //display error message and ->
//         req.flash('error', e.message);
//         //back to register page for one more attempt
//         res.redirect('register');
//     }
// }

// module.exports.renderLogin = (req, res) => {
//     res.render('users/login');
// }

// module.exports.login = (req, res) => {
//     req.flash('success', 'welcome back!');
//     //stores what user is requesting (url) before login, so that after login that page can be loded.
//     //url is stored in session
//     //returnTo is url which user will be redirected to
//     //if no request url is there redirect to /campgrounds.
//     const redirectUrl = req.session.returnTo || '/campgrounds';
//     delete req.session.returnTo;
//     res.redirect(redirectUrl);
// }

// module.exports.logout = (req, res) => {
//     req.logout();
//     // req.session.destroy();
//     req.flash('success', "Goodbye!");
//     res.redirect('/campgrounds');
// }