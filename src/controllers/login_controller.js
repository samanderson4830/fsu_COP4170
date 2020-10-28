//*********************************************/
// modules used                               *
//*********************************************/
const cryptoJS = require("crypto-js");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../model/db_connection');
const user = require('../seed/user_seeder')
//*********************************************/

exports.login = async (req, res) => {

    try {
        console.log(req.body);
        const { login_email, login_password } = req.body;
        
        // check if login feilds are left empty
        if (!login_email || !login_password) {

            return res.status(400).render('login', { message: 'Missing field!' });
        }

        let sql = 'SELECT user_ID, email, user_password FROM users WHERE email = ?';
        db.start.query(sql, [login_email], async (error, results) => {

            console.log(results);
            // temporaly removing hashing 
            // const match = await bcrypt.compare(login_password, results[0].user_password);
            // if (!results || !match)
            
            if (login_password != results[0].user_password) {

                return res.status(401).render('login', { message: 'Email or password is wrong' });

            } else {

                const id = results[0].user_ID;
                const token = jwt.sign({ id: id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });

                const cookieOpt = {

                    expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
                    httpOnlyt: true

                }

                // if successfull login go back to home page
                res.cookie('jwt', token, cookieOpt);
                res.status(200).redirect('/');
            }
        });
        
    } catch (error) {

        console.log(error);
    }
};