//*********************************************/
// modules used                               *
//*********************************************/
const db = require('../model/db_connection');

//*********************************************/

const get_products = (req, res) => {

    let products = new Array;
    let sql = "call My_Database.GetProduct()";

    db.start.query(sql, async (err, results) => {

        if (err) {

            throw err;

        } else {

            sql = 'call My_Database.NumberOfProducts(@total);'
            db.start.query(sql, (err, results) => {
                if (err) {

                    throw err;

                } else {

                    // var string = JSON.stringify(results);
                    // var json = JSON.parse(string);
                    //let total = 7;
                    // console.log("Total: " + total);

                    // for (key in results) {
                    //     console.log(results[key]);
                    // }
                }
            });
            let total = 7;
            // populate the prodcuts array with database      
            for (let inx = 0; inx < total; inx++) {

                products.push({
                    product_name: results[0][inx].product_name,
                    product_description: results[0][inx].product_description,
                    price: results[0][inx].price
                });



                console.log("Product ID:          " + results[0][inx].product_ID);
                console.log("Product Name:        " + results[0][inx].product_name);
                console.log("Product Description: " + results[0][inx].product_description);
                console.log("Price:               " + results[0][inx].price);
                console.log("Quantity:            " + results[0][inx].quantity);
                console.log("-------------------------------");

            }

        }
    });

    return products;
}

module.exports = {
    get_products
}