const aws = require('aws-sdk');
const dotenv = require('dotenv');

dotenv.config();
var awsRegion = global.gConfig.aws.aws_region;
var awsS3EndPoint = global.gConfig.aws.aws_s3_endpoint;
var awsSignatureVersion = "v4";
var awsExpirationTime = 3600;
aws.config.update({
    signatureVersion: awsSignatureVersion,
    secretAccessKey: global.gConfig.aws.aws_secret_access_key,
    accessKeyId: global.gConfig.aws.aws_access_key_id,
    region: awsRegion
});

const s3 = new aws.S3();

exports.awsSignPostRequest = function (req, res, next) {
    req.body.conditions.splice(7, 1);

    const params = {
        //todo: check if there is a better way to do this than accesing the array position directly
        Bucket: req.body.conditions[1].bucket,
        Fields: {
            'Content-Type': req.body.conditions[2]['Content-Type'],
            Key: req.body.conditions[5].key
        },
        Conditions: req.body.conditions,
        ExpiresIn: awsExpirationTime
    };

    const options = {
        signatureVersion: awsSignatureVersion,
        region: awsRegion,
        endpoint: new aws.Endpoint(awsS3EndPoint),
        useAccelerateEndpoint: false,
        s3ForcePathStyle: true,
    }; 

    const client = new aws.S3(options);

    const form = new Promise((resolve, reject) => {
        client.createPresignedPost(params, (err, data) => {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        });

    }).then(form => {
        return res.json({
            policy: form.fields['Policy'],
            signature: form.fields['X-Amz-Signature'],
            url: form['url']
        })
    }).catch(err => {
        next(err);
    });
};