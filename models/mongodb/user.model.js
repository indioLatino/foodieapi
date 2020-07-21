const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let UserSchema = new Schema({
    _id: {type: String, required: true},
    userName: {type: String, required: true},
    userLastName: {type: String, required: true},
    userEmail: {type: String, required: true},
    userGender: {type: String, required: true},
    userNickname: {type: String, required: false},
    userProfilePicture: {type: String, required: false},
    userRegistrationDate: {type: Date, required: true},
    cognitoUserSub: {type: String, required: false},
    userPostsNumber: {type: Number, required: false}
});


// Export the model
module.exports = mongoose.model('User', UserSchema);
