const Post = require('../models/post');
const User = require('../models/user');



module.exports.home = async function(req, res) {

    try {
        //populate the user of each post
        let posts = await Post.find({})
            .sort('-createdAt')
            .populate('user')
            .populate({
                path: 'comments',
                populate: {
                    path: 'user'
                }
            });

        let users = await User.find({});
        return res.render('home', {
            title: "Hello There | Home ",
            posts: posts,
            all_users: users
        });
    } catch (err) {
        console.log('Error', err);
        return;
    }
}

//method to delete a post from DOM
let deletePost = function(deleteLink) {
    $(deleteLink).click(function(e) {
        e.preventDefault();

        $.ajax({
            type: 'get',
            url: $(deleteLink).prop('href'),
            success: function(data) {
                $(`#post-${data.post_id}`).remove();
            },
            error: function(error) {
                console.log(error.responseText);
            }
        });
    });
}

/*
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

*/