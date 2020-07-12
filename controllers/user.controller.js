const User = require('../models/mongodb/user.model');

//Simple version, without validation or sanitation
exports.test = function (req, res) {
    res.send('El endpoint user funciona!');
};

// controllers/products.js
exports.createUser = function (req, res, next) {

    let user = new User(
        {
            userName: req.body.userName,
            userLastName: req.body.userLastName,
            userEmail: req.body.userEmail,
            userGender: req.body.userGender,
            userNickname: req.body.userNickname,
            userProfilePicture: req.body.userProfilePicture,
            userRegistrationDate: req.body.userRegistrationDate,
            userPostsNumber: req.body.userPostsNumber,
            userCognitoName: req.body.userCognitoName
        }
    );

    user.save(function (err, user) {
        if (err) {
            next(err);
        } else {
            console.log("User inserted correctly");
            res.send(user);
        }
    })
};


exports.getUsers = function (req, res, next) {
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
        if (err) {
            next(err);
        } else {
            res.send(user);
        }
    })
};

exports.updateUser = function (req, res) {
    User.findByIdAndUpdate(req.query.id, {$set: req.body}, function (err, user) {
        if (err) {
            return next(err);
        }
        res.status(200).send('User updated.');
    });
}

exports.deleteUser = function (req, res) {
    User.findByIdAndRemove(req.query.id, function (err) {
        if (err) {
            return next(err);
        } else {
            res.send('Deleted successfully!');
        }
    })
};
