const express = require('express');
const env = require('./config/environment');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');

const db = require('./config/mongoose');
//used for session cookie

const passport = require('passport');
const session = require('express-session');

const passportLocal = require('./config/passport-local-strategy');

const passportJWT = require('./config/passport-jwt-strategy');
//for google authentication
const passportGoogle = require('./config/passport-google-oauth2-strategy');

//const MongoStore = require('connect-mongo')(session);
//to connect mongo its require an argument -an object of Express session but i removed
const MongoStore = require('connect-mongo');

//for sass as a middileware
const sassMiddleware = require('node-sass-middleware');
const flash = require('connect-flash');
const customMware = require('./config/middleware');
//for chatting 
const chatServer = require('http').Server(app);
const chatSockets = require('./config/chat_sockets').chatSockets(chatServer);
chatServer.listen(5000);
console.log('chat server is listening on port 5000');


const path = require('path');

app.use(sassMiddleware({
    src: path.join(__dirname, env.asset_path, 'scss'),
    dest: path.join(__dirname, env.asset_path, 'css'),
    debug: true,
    outputStyle: 'extended',
    prefix: '/css'

}))


app.use(express.urlencoded());

app.use(cookieParser());

app.use(express.static(env.asset_path));
//make the upload path available to the browser
app.use('/uploads', express.static(__dirname + '/uploads'));

app.use(expressLayouts);
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);


const ejs = require('ejs');
//set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');

//mongo store is used to store the session cookie in the db
app.use(session({
    name: 'hello_there',
    //TODO change the secret before deployment in production mode 
    secret: env.session_cookie_key,
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)

    },
    store: new MongoStore({
            //  mongooseConnection: db,
            mongoUrl: 'mongodb://localhost/hello_there_db',
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

// adding flash for noticificcation it uses session cookie
app.use(flash());
app.use(customMware.setFlash);


//use express router
app.use('/', require('./routes'));

app.listen(port, function(err) {
    if (err) {
        console.log(`Error in running the server: ${port}`);

    }

    console.log(`Server is running on port: ${ port }`);

});