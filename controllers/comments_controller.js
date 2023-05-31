const Comment = require('../models/comment');
const Post = require('../models/post');
const Like = require('../models/like')
const commentsMailer = require('../mailers/comments_mailer');
const queue = require('../config/kue');

const commentEmailWorker = require('../workers/comment_email_worker');


module.exports.create = async function(req, res) {
    try {
        let post = await Post.findById(req.body.post);
        if (post) {
            let comment = await Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            });

            post.comments.push(comment);
            post.save();

            comment = await comment.populate({
                path: 'user',
                model: 'User'
            }).populate({
                path: 'post',
                model: 'Post',
                populate: {
                    path: 'user',
                    model: 'User'
                }
            }).execPopulate();
            //comment = await comment.populate('user', 'name email').execPopulate();
            //below line commented due to kue 
            //commentsMailer.newComment(comment);

            //job variable stores data in itself
            let job1 = queue.create('commenter-email', comment).save(function(err) {

                if (err) {
                    console.log('Error in sending to the queue', err);
                    return;
                }
                console.log('job enqueued', job1.id);
            });
            let job2 = queue.create('post-owner-email', comment).save(function(err) {
                if (err) {
                    console.log('Error in sending to the queue', err);
                    return;
                }
                console.log('Job enqueued', job2.id);
            });
            /*
            let job = queueMicrotask.create('emails', comment).save(function(err) {
                if (err) {
                    console.log('error in creating a queue');
                }
                console.log(job.id);

            });
            */
            if (req.xhr) {
                //similar for comments to fetch the user's id!

                return res.status(200).json({
                    data: {
                        comment: comment
                    },
                    message: "comment created!"
                });
            }
            req.flash('success', 'Comment Added!')
            return res.redirect('back');
        }
    } catch (err) {
        console.log('Error', err);
        return res.redirect('back');
    }

}



module.exports.destroy = async function(req, res) {
    try {
        let comment = await Comment.findById(req.params.id);
        let post = await Post.findById(comment.post);
        if (comment.user == req.user.id || post.user == req.user.id) {

            let postId = comment.post;
            comment.remove();

            let post = Post.findByIdAndUpdate(postId, { $pull: { comments: req.params.id } });
            //change: destroy the associated likes for this comment
            await Like.deleteMany({

                likeable: comment._id,
                onModel: 'Comment'
            });


            //send the comment id which was deleted back to the views 
            if (req.xhr) {
                return res.status(200).json({
                    data: {
                        comment_id: req.params.id
                    },
                    message: "Comment Deleted Successfully!"
                });
            }
            req.flash('success', 'Comment Removed!');
            return res.redirect('back');

        } else {
            req.flash('error', 'Unauthorized');
            return res.redirect('back');
        }

    } catch (err) {
        console.log('Error', err);
        return;
    }
}