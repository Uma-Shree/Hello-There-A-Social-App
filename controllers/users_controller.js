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

}

module.exports.createSession = function(req, res) {

}