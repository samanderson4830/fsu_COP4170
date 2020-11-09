//*********************************************/
// modules used                               *
//*********************************************/

/* files used */
const db = require('../model/db_connection');

//*********************************************/

/* create empty arrays used in populate_cart */
var items = new Array;
var cart = new Array;

cart = [];
items = [];

/* get the total number of items in a users cart */
function populate_cart(user_id) {
    /* variables used */


    var total_items = 0;

    if (items.length === 0 && cart.length === 0) {
        console.log("** Pt. 1 **");
        var sql = 'call My_Database.NumberOfItemsInCart(\'' + user_id + '\', @total);';
        db.start.query(sql, function (err, rows) {

            if (err) {

                throw err;
            }

            /* get total number of items in cart */
            total_items = rows[0][0].total;
            console.log("Total items ---> " + total_items);

            if (total_items > 0) {
                // ****************************************************
                // get product ids in users cart                      *
                // ****************************************************
                console.log("** Pt. 2 **");
                sql = 'call My_Database.ProductsInCart(\'' + user_id + '\');';
                db.start.query(sql, function (err, rows) {

                    if (err) {

                        throw err;
                    }
                    // add to items array
                    for (var inx = 0; inx < total_items; ++inx) {
                        console.log("id ---> " + rows[0][inx].product_ID);
                        items.push({ product_ID: rows[0][inx].product_ID });
                    }

                    // ****************************************************
                    // get product info of user cart                      *
                    // ****************************************************
                    console.log("** Pt. 3 **");
                    if (items.length > 0) {

                        /* loop through product ids to get product info */
                        sql = "call My_Database.GetProductInfo(?);";
                        for (var inx = 0; inx < total_items; ++inx) {

                            db.start.query(sql, [items[inx].product_ID], function (err, rows) {
                                if (err) {

                                    throw err;

                                } else {

                                    console.log("name ---> " + rows[0][0].product_name);
                                    cart.push({
                                        product_name: rows[0][0].product_name,
                                        price: rows[0][0].price
                                    });
                                }
                            });
                        }
                    }
                });
            }
        });
    }
    /* get the total cost of the cart */
    //get_cost(cart);
    console.log("Cart Size ---> " + cart.length);
    return cart;
}


function get_cost(array) {
    var sum = 0;
    for (var inx = 0; inx < array.length; ++inx) {
        sum += array[inx].price;
    }

    return sum.toFixed(2);;
}

module.exports = {
    populate_cart,
    get_cost
}