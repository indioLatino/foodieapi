const Item = require('../models/item.model');
const User = require('../models/user.model');
const Product = require('../models/product.model');
const Instruction = require('../models/instruction.model');
const ItemUser = require('../models/item-user.model');

//Simple version, without validation or sanitation
exports.test = function (req, res) {
    res.send('Greetings from the Test controller!');
};

// controllers/products.js
exports.createItem = function (req, res, next) {

    let item = new Item(
        {
            itemName: req.body.itemName,
            itemDescription: req.body.itemDescription,
            productList: req.body.productList,
            instructions: req.body.instructions
        }
    );

    item.save(function (err) {
        if (err) {
          next(err);
        }else{
          res.send('Product Created successfully');
        }
    })
};


exports.getItems=function (req, res, next) {
    var offset = req.query.offset;
    console.log(offset);
    var limit = req.query.limit;
    console.log(limit);
    Item.find({})
        .skip(Number(offset))
        .limit(Number(limit))
        .exec()
        .then(items => {
            res.status(200).json({
                items
            });
        })
        .catch(err => {
          console.log(err)
          next(err);
        });
};

exports.getItemsWithUser=function (req, res, next) {
    var offset = req.query.offset;
    console.log(offset);
    var limit = req.query.limit;
    console.log(limit);
    var itemUser = new ItemUser();
    Item.find({})
        .skip(Number(offset))
        .limit(Number(limit))
        .exec()
        .then(items => {
            itemUser.items=items;
            var user_ids = [];
            // var jsonItems = JSON.parse(items);
            // console.log(items[0].itemCreatorId);
            // console.log(items.length);
            for(var i=0;i<items.length;i++){
              user_ids.push(items[i].itemCreatorId);
              // console.log(items[i].itemCreatorId);
            }
            console.log(user_ids);
            User.find({_id:{$in :user_ids}})
            .exec()
            .then(users => {
                // console.log(users);
                itemUser.users=users;
                res.status(200).json({
                    itemUser
                });
            });
        })
        .catch(err => {
            console.log(err)
            next(err);
        });
};

exports.getItemDetail = function (req, res) {
    Item.findById(req.query.id, function (err, item) {
        if (err){
          next(err);
        }else{
          res.send(item);
        }
    })
};

exports.updateItem = function(req, res){
    Item.findByIdAndUpdate(req.query.id, {$set: req.body}, function (err, item) {
          if (err){
            next(err);
          }else{
            res.status(200).send('Item udpated.');
          }
      });
}

exports.deleteItem = function (req, res) {
    Item.findByIdAndRemove(req.query.id, function (err) {
        if (err){
          return next(err);
        }else{
          res.send('Deleted successfully!');
        }
    })
};
