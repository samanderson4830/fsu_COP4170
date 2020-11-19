//*********************************************/
// modules used                               *
//*********************************************/

/* files used */
const db = require('../model/db_connection');

//*********************************************/

var mytotal = 0;
function total_days() {

    var sql = 'call My_Database.NumberOfDays(@total);';
    db.start.query(sql, (err, results) => {

        if (err) {

            throw err;

        } else {

            mytotal = results[0][0].total;
        }
    });

    return mytotal;
}

function day_avaliable() {
    var total = total_days();
    var days = new Array;
    var sql = 'call My_Database.GetAvaliableDays();';
    db.start.query(sql, (err, results) => {

        if (err) {

            throw err;

        } else {
            for (var inx = 0; inx < total; ++inx) {
                var temp = results[0][inx].date_time;
                var date = new String(temp);
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

    var fullDate = str.substr(0, 15);
    var array = fullDate.split(" ");

    /* array [0] --> day of week
     * array [1] --> month
     * array [2] --> day of month
     * array [3] --> year
     */
    var year = array[3];
    var day = array[2];

    var month;
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
    var value = year.concat(month, day);
    console.log("value --> " + value);
    return value;
}

module.exports = {
    day_avaliable
}