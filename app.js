const express = require('express');
// initialize our express app
// config variables
const config = require('./config/config.js');
const app = express();
app.get('/', (req, res) => {
    res.json(global.gConfig);
});
const bodyParser = require('body-parser');

const item = require('./routes/item.route'); // Imports routes for the items
const user = require('./routes/user.route'); // Imports routes for the user
const aws = require('./routes/aws.route'); // Imports routes for the file-uploader
const product = require('./routes/product.route'); // Imports routes for the products

// Set up mongoose connection
const mongoose = require('mongoose');
process.env.NODE_ENV = 'development';
let dev_db_url = global.gConfig.database;
let mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(
    mongoDB,
    {
        useUnifiedTopology: true,
        useNewUrlParser: true
    }
    );
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


app.use(function(req, res, next) {
   var allowedOrigin = ["http://localhost:4200"];
   res.header("Access-Control-Allow-Origin", allowedOrigin);
   res.header("Access-Control-Allow-Credentials", true);
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-ijt");
   next();
}
);

app.use('/item', item);
app.use('/user', user);
app.use('/aws', aws);
app.use('/product', product);

app.use(
  (error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
      error: {
        message: error.message,
      },
    });
  }
);

let port = global.gConfig.node_port;
let app_name=global.gConfig.app_name;
app.listen(port, () => {
    console.log(app_name+'is up and listening on port numner ' + port);
});
