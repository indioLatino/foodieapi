const express = require('express');
const bodyParser = require('body-parser');

const item = require('./routes/item.route'); // Imports routes for the products
// Set up mongoose connection
const mongoose = require('mongoose');
let dev_db_url = 'mongodb://localhost/foodie';
let mongoDB = process.env.MONGODB_URI || dev_db_url;
/*mongoose.connect("mongodb://localhost:27017/foodie", {
    "user": "foodieMongoUser",
    "pass": "15091821",
    "useMongoClient": true,
    "useNewUrlParser": true
});*/
mongoose.connect(mongoDB,{ useNewUrlParser: true });
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// initialize our express app
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/item', item);
let port = 1234;

app.listen(port, () => {
    console.log('Server is up and running on port numner ' + port);
});
