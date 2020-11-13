//*********************************************/
// modules used                               *
//*********************************************/

/* files used */
const db = require('../model/db_connection');

//*********************************************/
function get_user_info (userID) {

    var user = new Array;
    var sql = 'call My_Database.GetUserInfo(\'' + userID + '\');';
    db.start.query(sql, (err, results) => {

        if (err) {

            throw err;

        } else {
            
            user.push({
                email: results[0][0].email,
                address: results[0][0].address,
                phone_number: results[0][0].phone_number
            });
        }
    });
    return user;
}

module.exports = {
    get_user_info
}