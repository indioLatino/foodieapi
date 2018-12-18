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
          res.send(err);
        }
        res.send('Product Created successfully')
    })
};


exports.getItems=function (req, res, next) {
    Item.find({})
        .exec()
        .then(docs => {
            res.status(200).json({
                docs
            });
        })
        .catch(err => {
            console.log(err)
        });
};
