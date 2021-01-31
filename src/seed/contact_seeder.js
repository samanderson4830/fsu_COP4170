//*********************************************/
// modules used                               *
//*********************************************/
const db = require('../model/db_connection');

//*********************************************/
/* create empty arrays used in populate_cart */
let contactInfo = new Array ();
function get_contact_info(userID) {
    let sql = 'call My_Database.GetContactInfo(?);';
    db.start.query(sql, [userID], async (err, result) => {
        if (err) {
            throw err;
        } else {
            await result
            // console.log("About --> "+ result[0][0].about);
            contactInfo.push({
                about: result[0][0].about,
                email: result[0][0].email,
                ig_link: result[0][0].ig_link,
                fb_link: result[0][0].fb_link,
                twitter_link: result[0][0].twitter_link
            });
        }
    });
    return  contactInfo;
}

module.exports = {
    get_contact_info,
}