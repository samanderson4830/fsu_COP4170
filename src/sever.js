//*********************************************/
// modules used                               *
//*********************************************/
const express      = require('express');
const path         = require('path');
const dotenv       = require('dotenv');
const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser');

//*********************************************/
const app = express();

dotenv.config({ path: '../src/.env' });
const db = require('../src/model/db_connection');

//*********************************************/
app.set('view engine', 'hbs');

// Serves static files 
app.use(express.static(path.join(__dirname, 'public')));

// parse URL encrypted bodies
app.use(bodyParser.urlencoded({extended : true}));

// Parse JSON bodies 
app.use(bodyParser.json());

// setting up cookies in browser
app.use(cookieParser());

//*********************************************/
// db connect
db.start.connect((error) => {
    if (error) {
        console.log(error);
    } else {
        console.log('Successfully connected to MySQL ...');
    }
});

//*********************************************/
// routes 
app.use('/auth', require(path.join(__dirname, 'routes', 'auth')));

app.use('/', require(path.join(__dirname, 'routes', 'pages')));

//*********************************************/
const port = process.env.PORT_NUMBER;

app.listen(port, () => {
    console.log('Server started on port ' + port);
});