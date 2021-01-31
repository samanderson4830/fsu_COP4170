//*********************************************/
// modules used                               *
//*********************************************/

/* files used */
const db = require('../model/db_connection');
const stats = require('../seed/stats_seeder');

//*********************************************/
function get_user_info(userID) {
    let user = new Array;
    let sql = 'call My_Database.GetUserInfo(?);';
    db.start.query(sql, [userID],(err, results) => {
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

//*********************************************/
async function get_all_users() {

    let total = stats.total_users();
    let usersArray = new Array ();
    let sql = 'call My_Database.GetAllUsers();';

    db.start.query(sql, (err, results) => {
        if (err) {
            throw err;
        } else {
            for (let inx = 0; inx < total; ++inx) {
                usersArray.push({
                    user_ID: results[0][0].user_ID,
                    email: results[0][0].email,
                    address: results[0][0].address,
                    phone_number: results[0][0].phone_number
                });
            }
        }
    });
    return usersArray;
}

//*********************************************/
let myCartID = 0;
function get_user_cartID(user_ID) {
    
    var sql = 'call My_Database.FindCartID(\'' + user_ID + '\');';
    db.start.query(sql, async(err, results) => {
        if (err) {
            throw err;
        } else {
            myCartID = await results[0][0].cart_ID;
        }
    });
    console.log("myCart ->> " + myCartID);
    return myCartID;
}

module.exports = {
    get_user_info,
    get_all_users,
    get_user_cartID
}