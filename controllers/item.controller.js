const Item = require('../models/item.model');

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

    product.save(function (err) {
        if (err) {
            return next(err);
        }
        res.send('Product Created successfully')
    })
};
