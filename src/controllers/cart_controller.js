//*********************************************/
// modules used                               *
//*********************************************/
const db = require('../model/db_connection');

//*********************************************/
function add_to_cart(cartID, productID) {

    console.log("cart ---->" + cartID);
    console.log("product ----->" + productID)
    var sql = 'call My_Database.AddToCart(?, ?);';
    db.start.query(sql, [productID, cartID], (error, results) => {

        if (error) {

            console.log(error);
        } else {

            console.log("Added to Cart");
        }
    });
}


module.exports = {
    add_to_cart
}