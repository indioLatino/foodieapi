const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let InstructionSchema = new Schema({
    instructionOrder:{type: Number, required: true},
    instructionText: {type: String, required: true}

});


// Export the model
module.exports = mongoose.model('Instruction', InstructionSchema);
