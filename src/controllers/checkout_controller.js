//*********************************************/
// modules used                               *
//*********************************************/
/* files used */
const db = require('../model/db_connection');
const user_cart = require('../seed/cart_seeder');
//*********************************************/

exports.checkout = function (req, res) {

    try {
        console.log(req.body);
        var { pick_up, order_notes } = req.body;

        if (!order_notes) {
            order_notes = "No notes ...";
        }

        const user_id = 1;
        const total_cost = user_cart.get_cost();
        // userid, date, cost
        var sql = 'call My_Database.AddOrder(\'' + user_id + '\', \'' + pick_up + '\', \'' + total_cost + '\', \'' + order_notes + '\');';
        db.start.query(sql, (error, results) => {
            if (error) {
                throw error;
            } else {

                console.log("Order added\n");
            }
        });
        update_order(user_id);
        res.status(200).redirect('/');
    } catch (error) {

        console.log(error);
    }
};

function update_order(userID) {
    /* get array of productID's and total items */
    var items = new Array;
    items = [];
    var total = user_cart.total_items(userID);
    var sql = 'call My_Database.ProductInCart(\'' + userID + '\');';

    if (total > 0 && items.length === 0) {
        db.start.query(sql, (err, result) => {
            if (err) {
                throw err;

            } else {
                for (var inx = 0; inx < total; ++inx) {
                    items.push({
                        product_ID: result[0][inx].product_ID,
                        amount: result[0][inx].amount
                    });
                }

                console.log("len is -> " + items.length);
                for (var inx = 0; inx < items.length; ++inx) {
                    sql = 'call My_Database.InOrder(\'' + userID + '\', \'' + items[inx].product_ID + '\', \'' + items[inx].amount + '\');';
                    db.start.query(sql, (error, results) => {
                        if (error) {
                            throw error;
                        } else {
                            console.log("Updated --> " + inx);
                        }
                    });
                }

            }
        });
    }
}