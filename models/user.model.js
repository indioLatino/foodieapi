const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let UserSchema = new Schema({
    // _id:{type: String, required: false},
    userName: {type: String, required: true},
    userNickname:{type: String, required: false},
    userProfilePicture:{type: String, required: false},
    userRegistrationDate: {type: Date, required: true},
    userPostsNumber:{type: Number, required: false}
});


// Export the model
module.exports = mongoose.model('User', UserSchema);


// "_id" : ObjectId("5c8e782d3c22e28644417fff"),
//     "userName" : "David González",
//     "userNickname" : "",
//     "userProfilePicture" :
//     "userRegistrationDate" : "2019-05-08",
//    "userPostsNumber" : "1"
