const Post = require('../models/post');
const Comment = require('../models/comment');
const Like = require('../models/like');
module.exports.create = async function(req, res) {
    try {
        let post = await Post.create({
            content: req.body.content,
            user: req.user._id
        });
        //xhr stands for xmlhttprequest
        if (req.xhr) {
            // if we want to populate just the name of the user (we'll not want to send the password in the API), this is how we do it! (To display the user's name with the post added dynamically)
            post = await post.populate('user', 'name').execPopulate();
            return res.status(200).json({
                data: {
                    post: post
                },
                message: "Post Created!"
            });
        }

        req.flash('success', 'Post Published');
        return res.redirect('back');
    } catch (err) {
        req.flash('error', err);
        return res.redirect('back');
    }
}

module.exports.destroy = async function(req, res) {
    try {
        let post = await Post.findById(req.params.id);

        if (post.user == req.user.id) {

            //change: delete associated likes for the post and all it s c omment
            await Like.deleteMany({
                likeable: post._id,
                onModel: 'Post'
            });
            await Like.deleteMany({
                _id: { $in: post.comments }
            });
            post.remove();

            await Comment.deleteMany({ post: req.params.id });

            if (req.xhr) {
                return res.status(200).json({
                    data: {
                        post_id: req.params.id
                    },
                    message: "Post deleted!"
                });
            }
            req.flash('success', 'Post and associated comments removed successfully!');
            return res.redirect('back');

        } else {
            req.flash('error', 'You cannot delete this post!');
            return res.redirect('back');

        }
    } catch (err) {
        req.flash('error', err);
        return res.redirect('back');
    }
}