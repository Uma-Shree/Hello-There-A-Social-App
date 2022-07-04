const mgoose = require('mongoose');
mgoose.connect('mongodb://localhost:27017/hello_there_development');
const db = mgoose.connection;
db.on('error', console.error.bind(console, 'error cennecting to database'));


//error

db.once('open', function() {
    console.log('Successfully connected to db');

});

module.exports = db;