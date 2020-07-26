const User = require('../models/mongodb/user.model');
const aws = require('aws-sdk');
const awsController = require('./aws.controller');
const authenticationService = require('../services/authentication.service');
const item_controller = require('../controllers/item.controller');


//Simple version, without validation or sanitation
exports.test = function (req, res) {
    res.send('El endpoint user funciona!');
};

// controllers/products.js
exports.createUser = function (req, res, next) {

    let user = new User(
        {
            _id: req.body.cognitoUserSub,
            userName: req.body.userName,
            userLastName: req.body.userLastName,
            userEmail: req.body.userEmail,
            userGender: req.body.userGender,
            userNickname: req.body.userNickname,
            userProfilePicture: req.body.userProfilePicture,
            userRegistrationDate: req.body.userRegistrationDate,
            userPostsNumber: req.body.userPostsNumber
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

exports.getUserDetailByToken = function (req, res, next) {
    const accesToken = req.body.accessToken;
    //Check if the token is valid
    authenticationService.isValidAccessToken(accesToken).then((result) => {
        // TOKEN valid
        let cognitoUser;
        //todo: get the sub/Username value from the jwt instead of making this call
        awsController.getUserDetail(accesToken).then((cognitoUser) => {
            this.cognitoUser = cognitoUser;
            User.findById(cognitoUser.Username, function (err, user) {
                if (err) {
                    next(err);
                } else {
                    res.send(user);
                }
            })
        }).catch((error) => {
            // TOKEN not valid
            console.log(error);
            next(error);
        });
    }).catch((error) => {
        res.status(440);
        res.send(error.name);
    });
}

exports.getUserDetail = function (req, res, next) {
    User.findById(req.query.id, function (err, user) {
        if (err) {
            next(err);
        } else {
            res.send(user);
        }
    })
};

//Todo: secure this endpoint
exports.updateUser = function (req, res, next) {
    User.findByIdAndUpdate(req.query.id, {$set: req.body}, function (err, user) {
        if (err) {
            return next(err);
        } else{
            updateItemsUserImage(req.query.id, req.body.userProfilePicture, next);
            res.send({'message':'updated'});
        }
    });
}

function updateItemsUserImage(creatorId, image, next) {
    item_controller.updateItemsCreatorPhoto(creatorId, image, next)
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
