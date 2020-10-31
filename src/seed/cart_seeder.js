//*********************************************/
// modules used                               *
//*********************************************/
const db = require('../model/db_connection');

//*********************************************/

/* get the total number of items in a users cart */
populate_cart = function (user_id) {
    /* variables used */
    var items = new Array;
    var cart = new Array;
    var total = 0;

    return new Promise(function (resolve, reject) {

        console.log("** Pt. 1 **");
        var sql = 'call My_Database.NumberOfItemsInCart(\'' + user_id + '\', @total);';
        db.start.query(sql, (err, rows) => {

            if (err) {

                return reject(err);
            }

            total = rows[0][0].total;
            if (total > 0) {
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
                    for (var inx = 0; inx < total; ++inx) {
                        items.push({ product_ID: rows[0][inx].product_ID });
                    }

                    if (items.length > 0) {

                        sql = "call My_Database.GetProductInfo(?);";
                        for (var inx = 0; inx < total; ++inx) {
                            db.start.query(sql, [items[inx].product_ID], (err, rows) => {
                                if (err) {

                                    return reject(err);
                                } else {

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

module.exports = {
    populate_cart
}