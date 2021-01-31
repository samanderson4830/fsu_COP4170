//*********************************************/
// modules used                               *
//*********************************************/
const db = require('../model/db_connection');

//*********************************************/

/* create empty arrays used in populate_cart */
let cart = new Array();
let total = 0;

function total_items(userID) {
    // console.log("cart seeder total!!");
    let sql = 'call My_Database.NumberOfItemsInCart(?, @total);';
    db.start.query(sql, [userID], (err, result) => {
        if (err) {
            throw err;
        } else {
            total = result[0][0].total;
            console.log("total is -> " + result[0][0].total)
        }
    });
    return total;
}

async function populate_cart(userID) {
    /* empty cart array and get total */
    cart = [];
    let total = total_items(userID);

    if (total > 0 && cart.length === 0) {
        let sql = 'call My_Database.PopulateCart(?);';
        db.start.query(sql, [userID], async (err, result) => {
            if (err) {
                throw err;
            } else {
                await result;
                for (let item of result[0]) {
                    cart.push({
                        product_ID: item.product_ID,
                        product_name: item.product_name,
                        amount: item.amount,
                        price: item.price
                    });
                }
            }
        });
    }
    return cart;
}

function get_cost() {
    let sum = 0;
    if (sum == 0) {
        for (let inx = 0; inx < cart.length; ++inx) {
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