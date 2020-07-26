const http = require('http');
let grocery_api_url = global.gConfig.grocery_api_url;
let grocery_api_port = global.gConfig.grocery_api_port;
let groceryApiUrl = process.env.GROCERY_API_URL || grocery_api_url;
let groceryApiPort = process.env.GROCERY_API_PORT || grocery_api_port;

const options = {
    hostname: groceryApiUrl,
    port: groceryApiPort
}

/**
 * Request the list of existing shopping lists for an item
 * @param itemId
 */
exports.getShoppingBasketsListByItemId = async function (itemId) {
    return new Promise(
        (resolve, reject) => {
            var shopingBasketsList;
            requestShoppingLists(itemId).then((shopingBasketsList) => {
                console.log(shopingBasketsList)
                resolve(shopingBasketsList);
            }).catch((error) => {
                console.log(error);
                reject(error);
            })
        });

}

exports.createShoppingList = function (item) {
    options.path = `/createShoppingList`;
    options.method = 'POST';
    const req = http.request(options,(res) => {
        res.on('data', (d) => {
            if(res.statusCode === 200){
                process.stdout.write(d);
                let content = JSON.parse(d);
            }else{
                console.log('error al crear la cesta de la compra')
            }
        });
    });
    req.on('error', (error) => {
        reject(error);
    })
    req.write(JSON.stringify({
        itemId: item._id,
        ingredientList: item.productList
    }));

    req.end();
}

let requestShoppingLists = function (itemId) {
    return new Promise(
        (resolve, reject) => {
            options.path = `/getShoppingListByItemId/${itemId}`;
            options.method = 'GET';
            const req = http.request(options,(res) => {
                res.on('data', (d) => {
                    if(res.statusCode === 200){
                        process.stdout.write(d);
                        let content = JSON.parse(d);
                        let shopingBasketsList = content.shoppingBasketList;
                        resolve(shopingBasketsList);
                    }else{
                        reject("No shopping list found for the item: " +itemId);
                    }
                });
            });
            req.on('error', (error) => {
                reject(error);
            })
            req.end();
            });
}
