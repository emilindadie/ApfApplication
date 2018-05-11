const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const port = 3000;
const app = express();

var mongoose = require('mongoose');

//require network db dependance
var db = require('./config/database');
mongoose.Promise === global.Promise; 

//Connect to the network db (mongodb  mlab)
mongoose.connect(db.url, function(err){
    if(err){
        console.log("Error ! " + err);
    }
})

//Connect to local db
//mongoose.connect('mongodb://localhost:27017/apf');

//secret to the app for jwt 
app.set('superSecret', db.secret); // secret variable


// Configuring Passport
const passport = require('passport');
var morgan = require('morgan');


app.use(express.static(path.join(__dirname, 'dist')));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(morgan('dev'));


// Initialize passport for use
// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

// Home route. We'll end up changing this to our main front end index later.
app.get('/', function(req, res) {
  res.send('Relax. We will put the home page here later.');
});

var router = express.Router();

//Get login page routes
require('./server/routes/signUp.route')(router);

//Get Fresenius routes
require('./server/routes/new-reparation.route')(router);

//Get FreseniusList routes
require('./server/routes/reparation-list.route')(router);

//Get Stock manage routes
require('./server/routes/new-stock.route')(router);

//Get Stock Visualize routes
require('./server/routes/stock-manage.route')(router);

//Get Login page routes
require('./server/routes/login-page.route')(router);

//Get Details page routes
require('./server/routes/reparation-details.route')(router);


//Get home page routes
require('./server/routes/home.route')(router);


//Get operation page routes
require('./server/routes/operations.route')(router);

//set login page routes to the app  -> CECI A ETE MODIFIER
app.use('/', router);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});

app.listen(port, function(){
    console.log("server is running on localhost : "+port);
})
