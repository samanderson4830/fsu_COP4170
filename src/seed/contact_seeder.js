// 
//*********************************************/
// modules used                               *
//*********************************************/

/* files used */
const db = require('../model/db_connection');

//*********************************************/
/* create empty arrays used in populate_cart */
var contactInfo = new Array;
const get_contact_info = (userID) => {

    var sql = 'call My_Database.GetContactInfo(\'' + userID + '\');';
    db.start.query(sql, (err, result) => {
        if (err) {
            throw err;

        } else {

            contactInfo.push({
                email: result[0][0].email,
                ig_link: result[0][0].ig_link,
                fb_link: result[0][0].fb_link,
                twitter_link: result[0][0].twitter_link
            });

        }
    });

    return contactInfo;
}


module.exports = {
    get_contact_info,
}