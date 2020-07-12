Item = require('../mongodb/item.model');
User = require('../mongodb/user.model');

function ItemUser(){
    this.items=[];
    this.users=[];
};


// Export the model
module.exports = ItemUser
