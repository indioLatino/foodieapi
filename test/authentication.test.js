const authenticationService=require('../services/authentication.service');
const assert = require('assert');
describe('Authentication', () => {
 it('should return success', () => {
        //var jwk = { "kty": "RSA", "n": "gQ8rd6nDjYYiHyhuL6oev5TgwbQ4OVUp54dK5FTPGfANIrw3l8EEV9wOOcrjJmfmluu2STfCFm5MvymJThtdUm_BjBLXffKzkxd403dPG6rJ-lzxy38sf2sqbtbkNnkUR6WAIlB6k3j0kPF2wUI_djTZMrHvHLaYDOYqzKUJIztAYzEnUB4_SxlF_KfMwkv6rIKgLwHKL7WH_dvTijTCvqn5194pOxCr9SIO_5J7eBrUlAqZGZkyIOWLuKbSuG217I_BCjHl7HPZ4eEU1vtogtopiJp9mDhFw4JVGKbkdJPdP_V5g7y67ApWXaZwhtVsUPNYQpv5ApV5iRs7XjgK8w", "e": "AQAB"};
        const jwt = 'eyJraWQiOiI3UXJQQTgzOEV2Z2FhaTU5TmE1ZndXaFRSNnRkWmhcL093MjZNd1NNaEdpWT0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiIwNTk0ZTkwZC1kNDI4LTRjY2MtOTdiYy1mNGM0YzQ4Y2Y4ZjgiLCJkZXZpY2Vfa2V5IjoiZXUtd2VzdC0xXzQ4MjVlOTNmLTc2ZTAtNDljZS05MzcwLTJlYmE0ODUxYjRiNiIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4iLCJhdXRoX3RpbWUiOjE1ODcyMjY5MDgsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC5ldS13ZXN0LTEuYW1hem9uYXdzLmNvbVwvZXUtd2VzdC0xX09CUklnYkVmWSIsImV4cCI6MTU4NzIzMDUwOCwiaWF0IjoxNTg3MjI2OTA4LCJqdGkiOiIzNzg1ZjFjOC0yZmVmLTRmZDYtYmFkZi0wMTFiZWE3ZDM0ZTYiLCJjbGllbnRfaWQiOiI2cmMyM2J2bXJ2aTNqMmRpODQ1dmMxOWdsbiIsInVzZXJuYW1lIjoiMDU5NGU5MGQtZDQyOC00Y2NjLTk3YmMtZjRjNGM0OGNmOGY4In0.ICIOK7H0X9VAcP-Atgi8EGx1fX3Mk6T_AejFfa1eZmpaE3k0PHipKbBnwXCouq16iPbcC_w-2GK4e1rb9FfLKEHpVy95gkch7opjo4Rr_jvSf1SzfNN_seaAh0sHEDqvSmjGHN5SNn3-TPEWSATWRf9hNYC0YuC7EfeSXQ9PwdTDOvOwlCmnHbjhDSQ_ZawDmInqDbJWJugUf9FgPkMaOcMY-IejWwLoYc4Ihf_LwxKDmYyn98u9N4zKisMG_N162fISB5-9_sY1IlUHvlbKbD8xS-6hkYKnpKLqMEUA5tqvNXDO5_P0zia0ZowM2gf_9WNFo_PKLlZpQymm4hcffQ';
        let result = "";
        authenticationService.isValidAccessToken(jwt).then((result) => {
            console.log(result);
            assert.equal(result, 'success');
        }).catch((error) => {
            console.log(error);
        });

    });
});
