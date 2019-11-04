const express = require('express');
const router = express.Router();
const upload = require('../controllers/file-uploader.controller');

router.get('/test', (req,res) => {
    res.send('Greetings from the Test controller!');
});
//todo: Check if this is a best practice to resolve everything in the route

router.post('/uploadFileToS3', upload.uploadFileToS3);
module.exports = router;
