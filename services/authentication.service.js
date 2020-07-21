/*var jwt = require('jsonwebtoken');
var jwkToPem = require('jwk-to-pem');
// todo: delete this require and uninstall the npm package
var request = require('request');



var iss = 'https://cognito-idp.eu-west-1.amazonaws.com/eu-west-1_OBRIgbEfY'*/

const config = require('../config/config.js');

const CognitoExpress = require("cognito-express");
const cognitoExpress = new CognitoExpress({
    region: global.gConfig.aws.aws_region,
    cognitoUserPoolId: global.gConfig.aws.cognito_pool_id,
    tokenUse: "access", //Possible Values: access | id
    tokenExpiration: 3600000 //Up to default expiration of 1 hour (3600000 ms)
});
const awsController = require('../controllers/aws.controller');



exports.getCognitoUser = async function (jwt) {
    awsController.getUserDetail(jwt);
}


/*const poolData = {
    UserPoolId : "eu-west-1_nILn3C1nT",//cognitoUserPoolId: global.gConfig.aws.cognito_pool_id, // Your user pool id here
    ClientId :  "77at440r3d1e9cfpvmob6lke8m"// Your client id here
};*/

exports.isValidAccessToken = async function (jwt, next) {
    return new Promise(
        (resolve, reject) => {

            cognitoExpress.validate(jwt, (err, response) => {
                if (err) {
                    switch (err.name) {
                        case "TokenExpiredError":
                            // todo: manage return message if token has expired
                            console.log(err.name);
                            break;
                        default:
                            next(err);
                    }
                    console.log(error);
                    reject(error);
                } else {
                    console.log(response)
                    resolve("success");

                }
            })
            //.catch((error) => {


            /*
        //API is not authenticated, do something with the error.
        //Perhaps redirect user back to the login page

        //ERROR TYPES:

        //If accessTokenFromClient is null or undefined
        err = {
            "name": "TokenNotFound",
            "message": "access token not found"
        }

        //If tokenuse doesn't match accessTokenFromClient
        {
            "name": "InvalidTokenUse",
            "message": "Not an id token"
        }

        //If token expired
        err = {
            "name": "TokenExpiredError",
            "message": "jwt expired",
            "expiredAt": "2017-07-05T16:41:59.000Z"
        }

        //If token's user pool doesn't match the one defined in constructor
        {
            "name": "InvalidUserPool",
            "message": "access token is not from the defined user pool"
        }

    */
            //         })
        });
}

/*exports.validateJwt = function (jwt, jwk) {
var pem = jwkToPem(jwk);
jwt.verify(token, pem, function(err, decoded) {
    if(err){
        return "error";
    }else{
        return "success";
    }
      console.log(decoded)
    });
}*/


/*unction validateToken(pems, token) {
    //Fail if the token is not jwt
    var decodedJwt = jwt.decode(token, {complete: true});
    if (!decodedJwt) {
        console.log("Not a valid JWT token");
        //context.fail("Unauthorized");
        return;
    }

    //Fail if token is not from your User Pool
    if (decodedJwt.payload.iss != iss) {
        console.log("invalid issuer");
        //context.fail("Unauthorized");
        return;
    }

    //Reject the jwt if it's not an 'Access Token'
    if (decodedJwt.payload.token_use != 'access') {
        console.log("Not an access token");
        //context.fail("Unauthorized");
        return;
    }

    //Get the kid from the token and retrieve corresponding PEM
    var kid = decodedJwt.header.kid;
    var pem = pems[kid];
    if (!pem) {
        console.log('Invalid access token');
        //context.fail("Unauthorized");
        return;
    }

    //Verify the signature of the JWT token to ensure it's really coming from your User Pool

    var secret = new Buffer(pem, 'base64');
    jwt.verify(token, secret,{ algorithms: ['RS256'] },function (err, payload) {
        if (err) {
            //context.fail("Unauthorized");
            console.log(err.message)
            return "error";
        } else {
            //Valid token. Generate the API Gateway policy for the user
            //Always generate the policy on value of 'sub' claim and not for 'username' because username is reassignable
            //sub is UUID for a user which is never reassigned to another user.

            var principalId = payload.sub;

            //Get AWS AccountId and API Options
            var apiOptions = {};
            var tmp = event.methodArn.split(':');
            var apiGatewayArnTmp = tmp[5].split('/');
            var awsAccountId = tmp[4];
            apiOptions.region = tmp[3];
            apiOptions.restApiId = apiGatewayArnTmp[0];
            apiOptions.stage = apiGatewayArnTmp[1];
            var method = apiGatewayArnTmp[2];
            var resource = '/'; // root resource
            if (apiGatewayArnTmp[3]) {
                resource += apiGatewayArnTmp[3];
            }

            //For more information on specifics of generating policy, see the blueprint for the API Gateway custom
            //authorizer in the Lambda console

            var policy = new AuthPolicy(principalId, awsAccountId, apiOptions);
            policy.allowAllMethods();

            //context.succeed(policy.build());
            return "success"
        }
    });
};


exports.calculatePems = function (jwt) {

    var pems;
    if (!pems) {
        //Download the JWKs and save it as PEM
        request({
            url: iss + '/.well-known/jwks.json',
            json: true
        }, function (error, response, body) {
            if (!error && response.statusCode === 200) {
                pems = {};
                var keys = body['keys'];
                console.log(keys);
                for (var i = 0; i < keys.length; i++) {
                    //Convert each key to PEM
                    var key_id = keys[i].kid;
                    var modulus = keys[i].n;
                    var exponent = keys[i].e;
                    var key_type = keys[i].kty;
                    var jwk = {kty: key_type, n: modulus, e: exponent};
                    var pem = jwkToPem(jwk);
                    pems[key_id] = pem;
                }
                //Now continue with validating the token
                validateToken(pems, jwt);
            } else {
                //Unable to download JWKs, fail the call
                context.fail("error");
            }
        });
    } else {
        //PEMs are already downloaded, continue with validating the token
        //ValidateToken(pems, event, context);
    }
    ;
}
*/
