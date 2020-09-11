//*********************************************/
// modules used                               *
//*********************************************/
const cryptoJS = require("crypto-js");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../model/db_connection');

//*********************************************/

exports.register = (req, res) => {

    const { email, password, passwordConfirm, phoneNumber, address } = req.body;

    //*********************************************/
    // error checking 

    // checking for in use email and passwords that dont match
    let sql = 'SELECT email FROM users WHERE email = ?';
    db.start.query(sql, [email], async (error, results) => {

        if (error) {

            console.log(error);

        }
    
        if (results.length > 0) {

            return res.render('register', { message: 'That Email has been taken' });

        } else if (password !== passwordConfirm) {

            return res.render('register', { message: 'Passwords do not match' });

        }

        // check if phone number is in use
        sql = 'SELECT phone_number FROM users WHERE phone_number = ?';
        db.start.query(sql, [phoneNumber], (error, results) => {

            if (error) {

                console.log(error);
            }

            if (results.length > 0) {

                return res.render('register', { message: 'Phone number is in use' });
            }
        });

        //*********************************************/
        let hashedPhoneNumber = cryptoJS.AES.encrypt(phoneNumber, process.env.CRYPTO_SECRET_KEY).toString();
        let hashedAddress = cryptoJS.AES.encrypt(address, process.env.CRYPTO_SECRET_KEY).toString();
        let hashedPassword = await bcrypt.hash(password, 8);
   

        // adding a new user
        sql = "call My_Database.AddUser(?, ?, ?, ?)";
        db.start.query(sql, [email, hashedPassword, hashedPhoneNumber, hashedAddress], (error, results) => {

            if (error) {

                console.log(error);

            } else {

                console.log("User Added"); 
                return res.render('index');
            }
        });
    });
}