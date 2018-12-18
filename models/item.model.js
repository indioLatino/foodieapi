const mongoose = require('mongoose');
Product = require('../models/product.model');
Instruction = require('../models/instruction.model');
ProductSchema = mongoose.model('Product').schema;
InstructionSchema = mongoose.model('Instruction').schema;
const Schema = mongoose.Schema;
let ItemSchema = new Schema({
    itemName: {type: String, required: true},
    itemDescription:{type: String, required: true},
    productList: [ProductSchema],
    instructions:[InstructionSchema]
});


// Export the model
module.exports = mongoose.model('Item', ItemSchema);
