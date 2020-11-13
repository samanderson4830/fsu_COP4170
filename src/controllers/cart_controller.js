//*********************************************/
// modules used                               *
//*********************************************/

/* files used */
const db = require('../model/db_connection');

//*********************************************/
function add_to_cart(cartID, productID) {

    console.log("add to cart    -----> " + cartID);
    console.log("product id is  -----> " + productID)
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


module.exports = {
    add_to_cart
}