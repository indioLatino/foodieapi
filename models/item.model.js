const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ItemSchema = new Schema({
    itemName: {type: String, required: true},
    itemDescription:{type: String, required: true},
    productList: {type: Object, required: true},
    instructions:{type: Object, required: true}
});


// Export the model
module.exports = mongoose.model('Item', ItemSchema);
