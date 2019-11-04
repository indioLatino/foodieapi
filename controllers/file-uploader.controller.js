const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const dotenv = require('dotenv');
var FileReader = require('filereader')
const IncomingForm = require('formidable').IncomingForm
dotenv.config();

//todo: handle errors here
aws.config.update({
    signatureVersion: 'v4',
    secretAccessKey: global.gConfig.aws_secret_access_key,
    accessKeyId: global.gConfig.aws_access_key_id,
    region: 'eu-west-1'
});

const s3 = new aws.S3();

/* In case you want to validate your file type */
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(new Error('Wrong file type, only upload JPEG and/or PNG !'),
            false);
    }
};

const upload = multer({
    fileFilter: fileFilter,
    storage: multerS3({
        acl: 'public-read',
        s3,
        bucket: 'foodieapi',
        key: function(req, file, cb) {
            /*I'm using Date.now() to make sure my file has a unique name*/
            req.file = Date.now() + file.name;
            cb(null, Date.now() + file.name);
        }
    })
});

exports.uploadFileToS3=function (req, res, next){
    const params = {
        Bucket: 'foodieapi',
        Key: 'test.png',
        Fields: {
            Key: 'test.png',
        },
    };
    const options = {
        signatureVersion: 'v4',
        region: 'eu-west-1', // same as your bucket

        endpoint : new aws.Endpoint('https://foodieapi.s3.amazonaws.com'),
        useAccelerateEndpoint : false,
        s3ForcePathStyle : true,  }

    const client = new aws.S3(options);
    const form = await (new Promise((resolve, reject) => {

        client.createPresignedPost(params, (err, data) => {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        });
    }));
    return res.json({
        form: { ...form, url: config.aws.s3.AWS_S3_ENDPOINT }
    })
}
//module.exports = upload;