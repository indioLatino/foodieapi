const User = require('../models/user.model');

//Simple version, without validation or sanitation
exports.test = function (req, res) {
    res.send('Greetings from the Test controller!');
};

// controllers/products.js
exports.createUser = function (req, res, next) {

    let user = new User(
        {
            userName:req.body.userName,
            userNickname:req.body.userNickname,
            userProfilePicture:req.body.userProfilePicture,
            userRegistrationDate:req.body.userRegistrationDate,
            userPostsNumber:req.body.userPostsNumber
        }
    );

    user.save(function (err) {
        if (err) {
          next(err);
        }else{
          res.send('User Created successfully')
        }
    })
};


exports.getUsers=function (req, res, next) {
    User.find({})
        .exec()
        .then(items => {
            res.status(200).json({
                items
            });
        })
        .catch(err => {
            next(err);
        });
};

exports.getUserDetail = function (req, res) {
    User.findById(req.query.id, function (err, user) {
        if (err){
          next(err);
        }else{
          res.send(user);
        }
    })
};

exports.updateUser = function(req, res){
    User.findByIdAndUpdate(req.query.id, {$set: req.body}, function (err, user) {
          if (err){
            return next(err);
          }
          res.status(200).send('User udpated.');
      });
}

exports.deleteUser = function (req, res) {
    Item.findByIdAndRemove(req.query.id, function (err) {
        if (err){
          return next(err);
        }else{
          res.send('Deleted successfully!');
        }
    })
};
