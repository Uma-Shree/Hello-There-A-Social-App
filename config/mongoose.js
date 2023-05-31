const mongoose = require('mongoose');
const env = require('./environment');
//27017 / hello_there_development
mongoose.connect('mongodb://localhost:27017/hello_there_details');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'error cennecting to database'));


//error

db.once('open', function() {
    console.log('Successfully connected to db');

});

module.exports = db;