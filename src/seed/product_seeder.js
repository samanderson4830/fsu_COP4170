//*********************************************/
// modules used                               *
//*********************************************/
const db = require('../model/db_connection');

//*********************************************/
let total = 0;
function total_products() {
    let sql = 'call My_Database.NumberOfProducts(@total);';

    db.start.query(sql, (err, results) => {
        if (err) {
            throw err;
        } else {
            console.log(">>>>>results: " + results[0][0].total);
            total = results[0][0].total;
        }
    });
    return total;
}

async function get_products() {
    // variables
    let products = new Array();
    let sql = "call My_Database.GetProduct()";

    db.start.query(sql, async (err, results) => {
        if (err) {
            throw err;
        } else {
            await results
            /* populate the products array with database  */
            for (let item of results[0]) {
                if (item.quantity > 0) {
                    products.push({
                        product_ID: item.product_ID,
                        img_link: item.img_link,
                        product_name: item.product_name,
                        quantity: item.quantity,
                        product_description: item.product_description,
                        price: item.price
                    });
                }
            }
        }
    });
    return products;
}

function get_quantity() {

    // variables
    let quantity = new Array;
    let total = total_products();

    let sql = "call My_Database.GetProduct()";
    db.start.query(sql, async (err, results) => {

        if (err) {

            throw err;

        } else {
            await results
            for (var inx = 0; inx < total; ++inx) {
                quantity.push({
                    product_ID: results[0][inx].product_ID,
                    product_name: results[0][inx].product_name,
                    quantity: results[0][inx].quantity,
                });
            }
        }
    });
    return quantity;
}

function get_popular() {

    // variables
    let popular = new Array;
    let total = total_products();

    let sql = "call My_Database.GetPopularProducts();";
    db.start.query(sql, async (err, results) => {
        if (err) {
            throw err;
        } else {
            await results
            for (var inx = 0; inx < total; ++inx) {
                popular.push({
                    rank: inx + 1,
                    product_ID: results[0][inx].product_ID,
                    product_name: results[0][inx].product_name,
                });
            }
        }
    });
    return popular;
}

module.exports = {
    total_products,
    get_products,
    get_quantity,
    get_popular,
}