//*********************************************/
// modules used                               *
//*********************************************/

/* files used */
const db = require('../model/db_connection');

//*********************************************/
function add_to_cart(cartID, productID) {

    var sucesses = false;
    console.log("cart    -----> " + cartID);
    console.log("product -----> " + productID)
    var sql = 'call My_Database.AddToCart(?, ?);';
    
    db.start.query(sql, [productID, cartID], (error) => {

        if (error) {

            console.log(error);
        } else {
            sucesses = true;
            console.log("Added to Cart");
        }
    });
    return sucesses;
}


module.exports = {
    add_to_cart
}