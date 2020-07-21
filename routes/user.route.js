const express = require('express');
const router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
const user_controller = require('../controllers/user.controller');


// a simple test url to check that all of our files are communicating correctly.
router.get('/test', user_controller.test);
router.post('/create', user_controller.createUser);
router.post('/detail-by-token', user_controller.getUserDetailByToken);
router.get('/get', user_controller.getUsers);
router.get('/detail', user_controller.getUserDetail);
router.put('/update', user_controller.updateUser);
router.delete('/delete', user_controller.deleteUser);
module.exports = router;
