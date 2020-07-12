const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ProductSchema = new Schema({
    productName: {type: String, required: true},
    productMeasurement:{type: Number, required: true},
    productUnit:{type: String, required: true}
});


// Export the model
module.exports = mongoose.model('Product', ProductSchema);
