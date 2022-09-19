const mongoose = require('mongoose');
const postSchema = new mongoose.Schema({
    content: {
        type: string,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamp: true
});
const Post = mongoose.model('Post', postSchema);
module.exports = Post;