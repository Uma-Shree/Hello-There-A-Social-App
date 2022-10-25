const mgoose = require('mongoose');
const multer = require('multer')
const path = require('path');
const AVATAR_PATH = path.join('/uploads/users/avatars');
const userSchema = new mgoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true

    },
    name: {
        type: String,
        required: true
    },
    avatar: {
        type: String
    }
}, {
    timestamps: true

});




//module.exports = User;
let storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, path.join(__dirname, '..', AVATAR_PATH));
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now());
    }
});

//statics mthods
userSchema.statics.uploadedAvatar = multer({ storage: storage }).single('avatar');
userSchema.statics.avatarPath = AVATAR_PATH;

const User = mgoose.model('User', userSchema);
module.exports = User;