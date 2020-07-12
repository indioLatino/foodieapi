//db.getCollection('products').distinct("name")

const express = require('express');
const router = express.Router();

const product_controller = require('../controllers/product.controller');
router.get('/products', product_controller.products);
module.exports = router;