const Product = require('../models/mongodb/product.model');

exports.products = function (req, res, next) {

    /*Product.agre('name', function(error, names) {
        if(error){
            next(error);
        }else{
            res.status(200).json({
                names
            });
        }
    });*/

    Product.aggregate([
        {
            $group: {
                '_id': '$name',
                'translations': {$first:'$translations'}
            }
        }
    ],function(error, response){
        if(error){
            next(error);
        }else{
            res.status(200).json({
                response
            });
        }
    });
};