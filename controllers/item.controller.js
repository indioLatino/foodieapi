const Item = require('../models/mongodb/item.model');
const User = require('../models/mongodb/user.model');
const ItemDetailResponse = require('../models/responses/item-detail-response.model');

//GROCERY-API
const groceryApi = require('../services/grocery.service');

//Simple version, without validation or sanitation
exports.test = function (req, res) {
    res.send('Hola desde foodie-api!');
};

// todo: return the item inserted
exports.createItem = function (req, res, next) {

    let item = new Item(
        {
            itemName: req.body.itemName,
            itemDescription: req.body.itemDescription,
            itemMainImage: req.body.itemMainImage,
            creator: req.body.creator,
            productList: req.body.productList,
            instructions: req.body.instructions
        }
    );

    item.save(function (err, item) {
        if (err) {
            next(err);
        } else {
            // groceryApi.createShoppingList(item);
            res.send(item);
        }
    })
};

exports.updateItemsCreatorPhoto = function (creatorId, image, next) {
    Item.updateMany({'creator.userId': creatorId}, {'creator.image': image}, function (err, item) {
        if (err) {
            next(err);
        }
    })
}


exports.getItems = function (req, res, next) {
    var creatorId = req.query.creatorId;
    var offset = req.query.offset;
    console.log(offset);
    var limit = req.query.limit;
    console.log(limit);
    Item.find({
            ...creatorId ? {'creator.userId': creatorId} : {}
        }
    ).skip(Number(offset))
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
}
;

//todo: finish this method
exports.getItemsWithUser = function (req, res, next) {
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
            itemUser.items = items;
            var user_ids = [];
            // var jsonItems = JSON.parse(items);
            // console.log(items[0].itemCreatorId);
            // console.log(items.length);
            for (var i = 0; i < items.length; i++) {
                user_ids.push(items[i].itemCreatorId);
                // console.log(items[i].itemCreatorId);
            }
            console.log(user_ids);
            User.find({_id: {$in: user_ids}})
                .exec()
                .then(users => {
                    // console.log(users);
                    itemUser.users = users;
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

exports.getItemDetail = function (req, res, next) {
    Item.findById(req.query.id, function (err, globalItem) {
        if (err) {
            next(err);
        } else {
            if (globalItem) {
                groceryApi.getShoppingBasketsListByItemId(globalItem._id).then((shopingBasketsList) => {
                    console.log(shopingBasketsList);
                    let itemDetailResponse = new ItemDetailResponse(globalItem, shopingBasketsList);
                    res.send(itemDetailResponse);
                }).catch((error) => {
                    console.log(error);
                    let itemDetailResponse = new ItemDetailResponse(globalItem);
                    res.send(itemDetailResponse);
                });
            }
        }
    })
};

// todo: secure this endpoint check for authentication and authorization (userId is the same than item.userId)
exports.updateItem = function (req, res, next) {
    Item.findByIdAndUpdate(req.query.id, {$set: req.body}, function (err, item) {
        if (err) {
            next(err);
        } else {
            // groceryApi.createShoppingList(item);
            res.status(200).send({'message': 'Item udpated.'});
        }
    });
}

exports.deleteItem = function (req, res) {
    Item.findByIdAndRemove(req.query.id, function (err) {
        if (err) {
            return next(err);
        } else {
            res.send('Deleted successfully!');
        }
    })
};
