//*********************************************/
// modules used                               *
//*********************************************/
const db = require('../model/db_connection');

//*********************************************/
let mytotal = 0;
function total_days() {

    let sql = 'call My_Database.NumberOfDays(@total);';
    db.start.query(sql, (err, results) => {

        if (err) {
            throw err;
        } else {
            mytotal = results[0][0].total;
        }
    });
    return mytotal;
}

async function day_available() {
    let total = total_days();
    let days = new Array ();
    let sql = 'call My_Database.GetAvaliableDays();';
    db.start.query(sql,  (err, results) => {
        if (err) {
            throw err;
        } else {
            for (let inx = 0; inx < total; ++inx) {
                let temp = results[0][inx].date_time;
                let date = new String(temp);
                date = parse_date(date);
                if (results[0][inx].slots > 0) {
                    days.push({
                        slots: results[0][inx].slots,
                        date_time: date,
                    });
                }
            }
        }
    });
    return days;
}

function parse_date(str) {

    let fullDate = str.substr(0, 15);
    let array = fullDate.split(" ");

    /* array [0] --> day of week
     * array [1] --> month
     * array [2] --> day of month
     * array [3] --> year
     */
    let year = array[3];
    let day = array[2];

    let month;
    switch (array[1]) {
        case "Jan":
            month = "-01-";
            break;

        case "Feb":
            month = "-02-";
            break;

        case "Mar":
            month = "-03-";
            break;

        case "Apr":
            month = "-04-";
            break;

        case "May":
            month = "-05-";
            break;

        case "Jun":
            month = "-06-";
            break;

        case "Jul":
            month = "-07-";
            break;

        case "Aug":
            month = "-08-";
            break;

        case "Sep":
            month = "-09-";
            break;

        case "Oct":
            month = "-10-";
            break;

        case "Nov":
            month = "-11-";
            break;

        case "Dec":
            month = "-12-";
            break;

        default:
            month = "-00-";
    }
    let value = year.concat(month, day);
    console.log("value --> " + value);
    return value;
}

module.exports = {
    day_available
}