//*********************************************/
// modules used                               *
//*********************************************/
const db = require('../model/db_connection');

//*********************************************/

/* get the total number of items in a users cart */
// function total_items(user_id) {
//     var total = 0;
//     var sql = 'call My_Database.NumberOfItesmInCart(?, @total);';

//     db.start.query(sql, [user_id], function (err, rows) {
//         if (err) { throw err };

//         console.log('Data received from Db: ' + rows[0][0].total);
//         total = rows[0][0].total;
//     });
//     return total;
// }

/* return more detail abou the items in a uers cart */
// function populate_cart(user_id) {
//     var total = total_items(user_id)
//     console.log("total: " + total);
//     for (var inx = 0; inx < total; ++inx) {
//         console.log(inx)
//     }
// }


// module.exports = {
//     populate_cart
// }