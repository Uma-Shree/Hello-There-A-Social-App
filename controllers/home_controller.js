const Post = require('../models/post');
const User = require('../models/user');
module.exports.home = function(req, res) {
    //return res.end('<h1> Express is up for Hello there! </h1>');

    //  console.log(req.cookies);
    //rendering the home ejs 

    /*
        Post.find({}, function(err, posts) {


            return res.render('home', {
                title: "Hello There | Home",
                posts: posts
            });

        });
        */
    //Populate the user of each post
    Post.find({}).populate('user')
        .populate({
            path: 'comments',
            populate: {
                path: 'user'
            }
        })
        .exec(function(err, posts) {

            User.find({}, function(err, users) {
                return res.render('home', {
                    title: "Hello There | Home",
                    posts: posts,
                    all_users: users
                });
            });
        });
}