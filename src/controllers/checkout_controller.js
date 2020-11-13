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
        res.status(200).redirect('/');
    } catch (error) {

        console.log(error);
    }
};