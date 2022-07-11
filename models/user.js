const mgoose = require('mongoose');
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
    }
}, {
    timestamps: true

});
const User = mgoose.model('User', userSchema);

module.exports = User;