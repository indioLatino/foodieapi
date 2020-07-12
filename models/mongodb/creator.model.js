const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let CreatorSchema = new Schema({
    userId: {type: String, required: true},
    name: {type: String, required: true},
    image: {type: String, required: true}
});


// Export the model
module.exports = mongoose.model('Creator', CreatorSchema);
