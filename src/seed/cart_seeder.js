//*********************************************/
// modules used                               *
//*********************************************/

/* files used */
const db = require('../model/db_connection');

//*********************************************/

/* create empty arrays used in populate_cart */
var cart = new Array;
var total = 0;
function total_items(userID) {
    // console.log("cart seeder total!!");
    var sql = 'call My_Database.NumberOfItemsInCart(?, @total);';
    db.start.query(sql, [userID], (err, result) => {
        if (err) {
            throw err;

        } else {
            total = result[0][0].total;
        }
    });

    return total;
}

function populate_cart(userID) {

    cart = [];
    var total = total_items(userID);
    console.log("Data found ..... " + total);

    if (total > 0 && cart.length === 0) {
        var sql = 'call My_Database.PopulateCart(\'' + userID + '\');';
        db.start.query(sql, async (err, result) => {

            if (err) {

                throw err;
            } else {
                // add to items array
                for (var inx = 0; inx < total; ++inx) {

                    cart.push({
                        product_ID: result[0][inx].product_ID,
                        product_name: result[0][inx].product_name,
                        amount: result[0][inx].amount,
                        price: result[0][inx].price
                    });
                }
                console.log("Cart length is --> " + cart.length);
            }
        });
    }
    return cart;
}

function get_cost() {
    var sum = 0;
    if (sum == 0) {
        for (var inx = 0; inx < cart.length; ++inx) {
            sum = sum + (cart[inx].price * cart[inx].amount);
        }
    }
    return sum.toFixed(2);
}

module.exports = {
    populate_cart,
    get_cost,
    total_items
}