const Item = require('../models/item.model');
const Product = require('../models/product.model');
const Instruction = require('../models/instruction.model');

//Simple version, without validation or sanitation
exports.test = function (req, res) {
    res.send('Greetings from the Test controller!');
};

// controllers/products.js
exports.createItem = function (req, res) {

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
          // res.send(err);
          return next(err);
        }
        res.send('Product Created successfully')
    })
};


exports.getItems=function (req, res, next) {
    Item.find({})
        .exec()
        .then(items => {
            res.status(200).json({
                items
            });
        })
        .catch(err => {
            console.log(err)
            return next(err);
        });
};

exports.getItemDetail = function (req, res) {
    Item.findById(req.query.id, function (err, item) {
        if (err){
          // res.send(err);
          return next(err);
        }
        res.send(item);
    })
};

exports.updateItem = function(req, res){
    Item.findByIdAndUpdate(req.query.id, {$set: req.body}, function (err, item) {
          if (err){
            return next(err);
          }
          res.status(200).send('Item udpated.');
      });
}

exports.deleteItem = function (req, res) {
    Item.findByIdAndRemove(req.query.id, function (err) {
        if (err){
          return next(err);
        }
        res.send('Deleted successfully!');
    })
};
