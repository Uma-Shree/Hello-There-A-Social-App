const User = require('../models/user');


module.exports.profile = function(req, res) {
    res.end('<h1>User Profile!</h1>')
}

//render sign up page
module.exports.signUp = function(req, res) {




    return res.render('user_sign_up', {
        title: "Hello There | Sign Up"
    });



}

//render sign in page
module.exports.signIn = function(req, res) {
    return res.render('user_sign_in', {
        title: "Hello There | Sign In"
    });
}

//get  the sign up data
module.exports.create = function(req, res) {
    if (req.body.password != req.body.confirm_password) {
        return res.redirect('back');
    }
    User.findOne({ email: req.body.email }, function(err, user) {
        if (err) {
            console.log('error in finding user in signining up');
            return
        }

        if (!user) {
            User.create(req.body, function(err, user) {
                if (err) {
                    console.log('error in creating user in signining up');
                    return
                }
                return res.redirect('/users/sign-in');
            })


        } else { return res.redirect('back'); }
    });
}

module.exports.createSession = function(req, res) {
    //edited
    return res.redirect('/');
}

module.exports.destroySession = function(req, res) {

    req.logout();
    return res.redirect('/');
    /*
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
    });
*/

}