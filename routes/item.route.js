const express = require('express');
const router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
const item_controller = require('../controllers/item.controller');


// a simple test url to check that all of our files are communicating correctly.
router.get('/test', item_controller.test);
router.post('/create', item_controller.createItem);
/*router.get('/:id/', item_controller.itemDetail);
router.put('/:id/update', item_controller.updateItem);
router.delete('/:id/delete', item_controller.deleteItem);*/
module.exports = router;
