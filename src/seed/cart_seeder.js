//*********************************************/
// modules used                               *
//*********************************************/
const db = require('../model/db_connection');

//*********************************************/
var total_cost = 0;
/* get the total number of items in a users cart */
populate_cart = function (user_id) {
    /* variables used */
    var items = new Array;
    var cart = new Array;
    var total_items = 0;
    total_cost = 0;
    return new Promise(function (resolve, reject) {

        console.log("** Pt. 1 **");
        var sql = 'call My_Database.NumberOfItemsInCart(\'' + user_id + '\', @total);';
        db.start.query(sql, (err, rows) => {

            if (err) {

                return reject(err);
            }

            total_items = rows[0][0].total;
            if (total_items > 0) {
                // ****************************************************
                // get product ids in users cart                      *
                // ****************************************************
                console.log("** Pt. 2 **");
                sql = 'call My_Database.ProductsInCart(\'' + user_id + '\');';
                db.start.query(sql, (err, rows) => {

                    if (err) {

                        return reject(err);
                    }
                    // add to items array
                    for (var inx = 0; inx < total_items; ++inx) {
                        items.push({ product_ID: rows[0][inx].product_ID });
                    }

                    // ****************************************************
                    // get product info of user cart                      *
                    // ****************************************************
                    console.log("** Pt. 3 **");
                    if (items.length > 0) {

                        sql = "call My_Database.GetProductInfo(?);";
                        for (var inx = 0; inx < total_items; ++inx) {
                            db.start.query(sql, [items[inx].product_ID], (err, rows) => {
                                if (err) {

                                    return reject(err);
                                } else {
                                    total_cost += rows[0][0].price;
                                    cart.push({
                                        product_name: rows[0][0].product_name,
                                        price: rows[0][0].price
                                    });
                                }
                          
                            });
                        }

                        resolve(cart);
                    }
                });
            }
        });
    });
}

get_cost = function () {
    return total_cost;
}

module.exports = {
    populate_cart,
    get_cost
}