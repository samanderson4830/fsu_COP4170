//*********************************************/
// modules used                               *
//*********************************************/

/* files used */
const db = require('../model/db_connection');

//*********************************************/
var mytotal = 0;
const total_products = () => {

    var sql = 'call My_Database.NumberOfProducts(@total);';
    db.start.query(sql, (err, results) => {

        if (err) {

            throw err;

        } else {

            mytotal = results[0][0].total;
            // log value for debuging
            // console.log(">>>>>results: " + results[0][0].total);

        }
    });

    return mytotal;
}

const get_products = () => {

    // variables
    var products = new Array;
    var total = total_products();
    console.log("Product total is : " + total);

    var sql = "call My_Database.GetProduct()";
    db.start.query(sql, async (err, results) => {

        if (err) {

            throw err;

        } else {

            // populate the prodcuts array with database      
            for (var inx = 0; inx < total; ++inx) {
                if (results[0][inx].quantity > 0) {
                    products.push({
                        product_ID: results[0][inx].product_ID,
                        img_link: results[0][inx].img_link,
                        product_name: results[0][inx].product_name,
                        quantity: results[0][inx].quantity,
                        product_description: results[0][inx].product_description,
                        price: results[0][inx].price
                    });
                }
                // display values for debuging 
                // console.log("Product ID:          " + results[0][inx].product_ID);
                // console.log("Product Name:        " + results[0][inx].product_name);
                // console.log("Product Description: " + results[0][inx].product_description);
                // console.log("Price:               " + results[0][inx].price);
                // console.log("Quantity:            " + results[0][inx].quantity);
                // console.log("-------------------------------");
            }
        }
    });

    return products;
}

const get_quantity = () => {

    // variables
    var quantity = new Array;
    var total = total_products();

    var sql = "call My_Database.GetProduct()";
    db.start.query(sql, async (err, results) => {

        if (err) {

            throw err;

        } else {

            // populate the prodcuts array with database      
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

const get_popular = () => {

    // variables
    var popular = new Array;
    var total = total_products();

    var sql = "call My_Database.GetPopularProducts();";
    db.start.query(sql, async (err, results) => {

        if (err) {

            throw err;

        } else {

            // populate the prodcuts array with database      
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
    get_popular
}