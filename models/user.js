const mgoose = require('mongoose');
userSchema = new mgoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: string,
        required: true,

    },
    name: {

        type: string,
        required: true
    }
}, {
    timestamps: true

});
const User = mgoose.model('User', userSchema);

module.exports = User;