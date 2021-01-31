//*********************************************/
// modules used                               *
//*********************************************/
const db = require('../model/db_connection');

//*********************************************/

/* get the get number of order in the db from a user */
let mytotal = 0;
function total_orders(userID) {

    let sql = 'call My_Database.NumberOfOrders(?, @total);';
    db.start.query(sql, [userID], (err, results) => {
        if (err) {
            throw err;
        } else {
            mytotal = results[0][0].total;
            // log value for debuging
            console.log(">>>>>total orders : " + results[0][0].total);
        }
    });
    return mytotal;
}

/* get the get number of order in the db */
let allTotal = 0;
function all_total_orders() {

    let sql = 'call My_Database.NumberOfAllOrders(@total);';
    db.start.query(sql, (err, results) => {
        if (err) {
            throw err;
        } else {
            allTotal = results[0][0].total;
            // log value for debugging
            console.log(">>>>>total orders : " + results[0][0].total);
        }
    });
    return allTotal;
}

/* order info by userID */
function get_orders(userID) {

    let total = total_orders(userID);
    let orders = new Array;
    orders = [];
    let sql = 'call My_Database.GetUserOrders(?);';
    if (total > 0) {
        db.start.query(sql, [userID], async (err, results) => {
            if (err) {

                throw err;

            } else {
                await results;
                // populate the order array with database      
                let status;
                for (let inx = 0; inx < total; ++inx) {
                    /* output for order status */
                    if (results[0][inx].is_active === 1) {

                        status = "Active";
                    } else {

                        status = "Inactive";
                    }
                    /* parse output for dates */
                    let pick_up = results[0][inx].date_time;
                    let placed = results[0][inx].placed_on;

                    let temp = new String(pick_up);
                    pick_up = parse_date(temp);

                    let temp2 = new String(placed);
                    placed = parse_date(temp2);

                    orders.push({
                        total_cost: results[0][inx].total_cost,
                        order_ID: results[0][inx].order_ID,
                        is_active: status,
                        date_time: pick_up,
                        placed_on: placed
                    });
                }
            }
        });
    }
    return orders;
}

/* order info fro all users */
function get_all_orders() {
    let total = all_total_orders();
    let allOrders = new Array;
    allOrders = [];
    let sql = 'call My_Database.GetAllOrders();';

    if (total > 0) {
        db.start.query(sql, (err, results) => {
            if (err) {
                throw err;
            } else {

                // populate the order array with database      
                let status;
                for (let inx = 0; inx < total; ++inx) {
                    /* output for order status */
                    if (results[0][inx].is_active === 1) {

                        status = "Active";
                    } else {
                        status = "Inactive";
                    }
                    /* parse output for dates */
                    let pick_up = results[0][inx].date_time;
                    let placed = results[0][inx].placed_on;

                    let temp = new String(pick_up);
                    pick_up = parse_date(temp);

                    let temp2 = new String(placed);
                    placed = parse_date(temp2);

                    allOrders.push({
                        user_ID: results[0][inx].user_ID,
                        order_notes: results[0][inx].order_notes,
                        total_cost: results[0][inx].total_cost,
                        order_ID: results[0][inx].order_ID,
                        is_active: status,
                        date_time: pick_up,
                        placed_on: placed
                    });
                }
            }
        });
    }
    return allOrders;
}

function get_order_products() {
    let productsInOrder = new Array;
    productsInOrder = [];
    let sql = 'SELECT * FROM order_has;';

    db.start.query(sql, (err, results) => {
        if (err) {
            throw err;
        } else {
            for (let item of results) {
                productsInOrder.push({
                    order_ID: item.order_ID,
                    amount: item.amount,
                    product_ID: item.product_ID
                });
            }
        }
    });
    return productsInOrder;
}

function parse_date(str) {
    return str.substr(0, 15);
}

module.exports = {
    get_orders,
    get_all_orders,
    get_order_products
}