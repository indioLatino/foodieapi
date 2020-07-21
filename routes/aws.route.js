const express = require('express');
const router = express.Router();
const cors = require('cors')
const awsController = require('../controllers/aws.controller');
express().options('/aws/awsSignPostRequest', cors());
router.get('/test', (req,res) => {
    res.send('Greetings from the Test controller!');
});
//todo: Check if this is a best practice to resolve everything in the route

router.post('/awsSignPostRequest', awsController.awsSignPostRequest);
module.exports = router;
