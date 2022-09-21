const Post = require('../models/post');
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
    Post.find({}).populate('user').exec(function(err, posts) {
        return res.render('home', {
            title: "Hello There | Home",
            posts: posts
        });
    })
}