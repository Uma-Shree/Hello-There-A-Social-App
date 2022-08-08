const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');

const db = require('./config/mgoose');
//used for session cookie

const passport = require('passport');
const session = require('express-session');

const passportLocal = require('./config/passport-local-strategy');
//to connect mongo its require an argument -an object of Express session but i removed
const MongoStore = require('connect-mongo');


app.use(express.urlencoded());

app.use(cookieParser());

app.use(express.static('./assets'));

app.use(expressLayouts);
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);



//set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');

//mongo store is used to store the session cookie in the db
app.use(session({
    name: 'hello_there',
    //TODO change the secret before deployment in production mode 

    secret: 'blahsomething',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)

    },
    store: new MongoStore({
            //  mongooseConnection: db,
            mongoUrl: 'mongodb://localhost/hello_there_development',
            autoRemoved: 'disabled'
        },
        function(err) {
            console.log(err || 'connect-mongodb setup ok');
        }
    )
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

//use express router
app.use('/', require('./routes'));

app.listen(port, function(err) {
    if (err) {
        console.log(`Error in running the server: ${port}`);

    }

    console.log(`Server is running on port: ${port}`);

});