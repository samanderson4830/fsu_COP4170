///*********************************************/
// modules used                               *
// *********************************************/
/* files used */
const db = require('../model/db_connection');
const user_cart = require('../seed/cart_seeder');
//*********************************************/

exports.checkout = function (req, res) {

    try {
        console.log(req.body);
        var { pickUp, orderNotes } = req.body;

        if (!orderNotes) {
            orderNotes = "None";
        }

        const userID = 1;
        const totalCost = user_cart.get_cost();
        // userid, date, cost, notes
        var sql = 'call My_Database.AddOrder(\'' + userID + '\', \'' + pickUp + '\', \'' + totalCost + '\', \'' + orderNotes + '\');';
        db.start.query(sql, (error, results) => {
            if (error) {
                throw error;
            } else {

                console.log("Order added\n");
            }
        });
        update_order(userID);
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
    
    if (total > 0 && items.length === 0) {
        var sql = 'call My_Database.ProductInCart(\'' + userID + '\');';
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