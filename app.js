const express = require('express');
const bodyParser = require('body-parser');

const item = require('./routes/item.route'); // Imports routes for the items
const user = require('./routes/user.route'); // Imports routes for the user
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



app.use('/item', item);
app.use('/user', user);



app.use(function(req, res, next) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   console.log("Se ejecuta cabeza de pija");
   next();
}
);


app.use(
  (error, req, res, next) => {
    console.log("Se ejecuta lokita");
    res.status(error.status || 500);
    console.log("Se ejecuta lokita 2");
    res.json({
      error: {
        message: error.message,
      },
    });
    console.log("Se ejecuta lokita 3");
  }
//   function (err, req, res, next) {
//   console.log("Hola Hola Hola");
//   // console.error(err.stack);
//   res.status(error.code).send(error.message);
// }
);

let port = global.gConfig.node_port;
let app_name=global.gConfig.app_name;
app.listen(port, () => {
    console.log(app_name+'is up and listening on port numner ' + port);
});
