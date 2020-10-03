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

                    let total;
                    console.log("Total: " + results[0][0].total)

                    for (key in results){
                        total = results[0][0].total;
                        console.log(results[key]);
                    }
                    

                }
            });

            // populate the prodcuts array with database   
            // update 7 to be total number of products from db
            // instead of being hard coded     
            for (let inx = 0; inx < 21; inx++) {

                products.push({
                    product_name: results[0][inx].product_name,
                    product_description: "This is a product description",
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