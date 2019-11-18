const express = require('express');
const router = express.Router();
const awsController = require('../controllers/aws.controller');

router.get('/test', (req,res) => {
    res.send('Greetings from the Test controller!');
});
//todo: Check if this is a best practice to resolve everything in the route

router.post('/awsSignPostRequest', awsController.awsSignPostRequest);
module.exports = router;
