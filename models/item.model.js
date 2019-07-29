const mongoose = require('mongoose');
Product = require('../models/product.model');
Instruction = require('../models/instruction.model');
Creator = require('../models/creator.model');
ProductSchema = mongoose.model('Product').schema;
InstructionSchema = mongoose.model('Instruction').schema;
CreatorSchema = mongoose.model('Creator').schema;
const Schema = mongoose.Schema;
let ItemSchema = new Schema({
    // _id:{type: String, required: false},
    itemName: {type: String, required: true},
    creator:{type: CreatorSchema, required: true},
    itemDescription:{type: String, required: true},
    itemMainImage:{type: String, required: true},
    productList: [ProductSchema],
    instructions:[InstructionSchema]
});


// Export the model
module.exports = mongoose.model('Item', ItemSchema);
