//*********************************************/
// modules used                               *
//*********************************************/

/* files used */
const db = require('../model/db_connection');

//*********************************************/
function add_to_cart(cartID, productID) {

    console.log("add to cart    -----> " + cartID);
    console.log("product id is  -----> " + productID);
    var sql = 'call My_Database.AddToCart(\'' + productID + '\', \'' + cartID + '\');';

    db.start.query(sql, function (error) {

        if (error) {

            console.log(error);
        } else {

            console.log("Added to Cart");
            return true;
        }
    });
    return false;
}

function remove(cartID, productID) {

    console.log("remove from cart    -----> " + cartID);
    console.log("product id is       -----> " + productID);
    var sql = 'call My_Database.RemoveFromCart(\'' + productID + '\', \'' + cartID + '\');';

    db.start.query(sql, function (error) {

        if (error) {

            console.log(error);
        } else {

            console.log("Removed From Cart");
            return true;
        }
    });
    return false;
}

function increment_amount(cartID, productID) {

    var sql = 'call My_Database.IncrementAmount(\'' + productID + '\', \'' + cartID + '\');';
    db.start.query(sql, function (error) {

        if (error) {

            console.log(error);
        } else {

            console.log("Increment Amount");
            return true;
        }
    });
    return false;
}

function decrement_amount(cartID, productID) {
    var sql = 'call My_Database.DecrementAmount(\'' + productID + '\', \'' + cartID + '\');';
    db.start.query(sql, function (error) {

        if (error) {

            console.log(error);
        } else {

            console.log("Decrement Amount");
            return true;
        }
    });
    return false;
}

module.exports = {
    add_to_cart,
    remove,
    increment_amount,
    decrement_amount
}