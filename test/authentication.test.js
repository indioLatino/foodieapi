const authenticationService=require('../services/authentication.service');
const assert = require('assert');
describe('Authentication', () => {
 it('should return success', () => {
        //var jwk = { "kty": "RSA", "n": "gQ8rd6nDjYYiHyhuL6oev5TgwbQ4OVUp54dK5FTPGfANIrw3l8EEV9wOOcrjJmfmluu2STfCFm5MvymJThtdUm_BjBLXffKzkxd403dPG6rJ-lzxy38sf2sqbtbkNnkUR6WAIlB6k3j0kPF2wUI_djTZMrHvHLaYDOYqzKUJIztAYzEnUB4_SxlF_KfMwkv6rIKgLwHKL7WH_dvTijTCvqn5194pOxCr9SIO_5J7eBrUlAqZGZkyIOWLuKbSuG217I_BCjHl7HPZ4eEU1vtogtopiJp9mDhFw4JVGKbkdJPdP_V5g7y67ApWXaZwhtVsUPNYQpv5ApV5iRs7XjgK8w", "e": "AQAB"};
        const jwt = 'eyJraWQiOiI3UXJQQTgzOEV2Z2FhaTU5TmE1ZndXaFRSNnRkWmhcL093MjZNd1NNaEdpWT0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJiMjlmNTgyMi03MWRhLTQxNzEtYmNhNC03NDZhNzMxMzE3NzIiLCJkZXZpY2Vfa2V5IjoiZXUtd2VzdC0xX2E0YWVjYzRhLTFjY2EtNDZlOC04M2YzLTFkYWI3MTY3MzMyMiIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4iLCJhdXRoX3RpbWUiOjE1OTQ2MzI2ODgsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC5ldS13ZXN0LTEuYW1hem9uYXdzLmNvbVwvZXUtd2VzdC0xX09CUklnYkVmWSIsImV4cCI6MTU5NDYzNjI4OCwiaWF0IjoxNTk0NjMyNjg4LCJqdGkiOiIyMzRjODUyNi0xYmM2LTQ1MDMtYmVkMi04OWVhMjRhYTAyZjQiLCJjbGllbnRfaWQiOiI2cmMyM2J2bXJ2aTNqMmRpODQ1dmMxOWdsbiIsInVzZXJuYW1lIjoiYjI5ZjU4MjItNzFkYS00MTcxLWJjYTQtNzQ2YTczMTMxNzcyIn0.Q0dNcHEWECL4jsq-zoI2ZRAl8qzDby_kDDVdFD63nsoHTiS621FGiGT2fRbMcYsp7geDNgA-ISLoxD-3CeSEAv3nKQm9kRK5wjSx9cER-33GZRCDyLxT82U36ns8z49diPlWKEVuZ7TgWekVx7ZNVsj3Ueu8QM-pBjniBXzw4Tkbmo4pgPklTPkeqx_s9bULOeuy8VxAgTfgbbcEoqv5lh8X51fR3LDJsWKObMHXrF3olH20ykTHO7P6JyYjGlQ7GPF32EVSfP9eIQHKxPJfa6pzeiogUrLfEFTUVyPA63ZrDRMjP1VUkSCd8EoMJycr_jMDSDaNfio62hDiPUyY2w';
        let result = "";
        authenticationService.isValidAccessToken(jwt).then((result) => {
            console.log(result);
            //assert.equal(result, 'success');
        }).catch((error) => {
            console.log(error);
        });
     authenticationService.getCognitoUser(jwt).then(result=>{})

    });
});
