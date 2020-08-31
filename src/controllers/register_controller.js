//*********************************************/
// modules used                               *
//*********************************************/
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../model/db_connection');

//*********************************************/

exports.register = (req, res) => {

    const { email, password, passwordConfirm, phoneNumber } = req.body;

    //*********************************************/
    // error checking 

    // checking for in use email and passwords that dont match
    let sql =  'SELECT email FROM users WHERE email = ?';
    db.start.query(sql, [email], async (error, results) => {

        if(error) {

          console.log(error);

        }
    
        if(results.length > 0 ) {

            return res.render('../src/views/register',{ message: 'That Email has been taken'});

        } else if(password !== passwordConfirm) {

            return res.render('../src/views/register', { message: 'Passwords do not match'});

        }
          
        // check if phone number is in use
        sql = 'SELECT phone_number FROM users WHERE phone_number = ?';
        db.start.query(sql, [phoneNumber],  (error, results) => {

            if(error) {

                console.log(error);
            }

            if(results.length > 0) {

                return res.render('../src/views/register', { message: 'Phone number in use'});
            } 
        });

        let hashedPassword = await bcrypt.hash(password, 8);

        // adding a new user
        sql = "call My_Database.AddUser(?, ?, ?)";
        db.start.query(sql, [email, hashedPassword, phoneNumber], (error, results) => {

            if (error) {

                console.log(error);

            } else {

                console.log("User Added");
                return res.render('../src/views/index');
            }
        });
    });
}