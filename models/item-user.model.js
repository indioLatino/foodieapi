const mongoose = require('mongoose');

Item = require('../models/item.model');
User = require('../models/user.model');
// ItemsSchema = mongoose.model('Item').schema;
// UserSchema = mongoose.model('User').schema;
// const Schema = mongoose.Schema;
function ItemUser(){
    this.items=[];
    this.users=[];
};


// Export the model
module.exports = ItemUser
