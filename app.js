const express = require('express');
const bodyParser = require('body-parser');

const item = require('./routes/item.route'); // Imports routes for the products
// initialize our express app
// config variables
const config = require('./config/config.js');
const app = express();
app.get('/', (req, res) => {
    res.json(global.gConfig);
});
// Set up mongoose connection
const mongoose = require('mongoose');
process.env.NODE_ENV = 'development';
let dev_db_url = global.gConfig.database;
let mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB,{ useNewUrlParser: true });
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(function(req, res, next) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
 });
app.use('/item', item);
let port = global.gConfig.node_port;
let app_name=global.gConfig.app_name;
app.listen(port, () => {
    console.log(app_name+'is up and listening on port numner ' + port);
});
