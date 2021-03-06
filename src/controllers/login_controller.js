//*********************************************/
// modules used                               *
//*********************************************/
const cryptoJS = require("crypto-js");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

/* files used */
const db = require('../model/db_connection');

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
            // removing hashing 
            // const match = await bcrypt.compare(login_password, results[0].user_password);
            // if (!results || !match)

            if (login_password != results[0].user_password) {

                return res.status(401).render('login', { message: 'Email or password is wrong' });

            } else {

                const userID = results[0].user_ID;
                sql = "call My_Database.MakeCart(?);";
                db.start.query(sql, [userID], (error, results) => {
                    if (error) {

                        console.log("Cart not made");
                    } else {

                        console.log("Cart was made");
                    }
                });
                const token = jwt.sign({ id: userID, admin: false }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });

                const cookieOpt = {

                    expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
                    httpOnlyt: true

                }

                // if successfully login go back to home page
                res.cookie('jwt', token, cookieOpt);
                res.status(200).redirect('/');
            }
        });

        /* attempt to login as admin*/
        sql = 'SELECT user_ID, email, user_password FROM admin WHERE email = ?';
        db.start.query(sql, [login_email], async (error, results) => {

            console.log(results);
            // removing hashing 
            // const match = await bcrypt.compare(login_password, results[0].user_password);
            // if (!results || !match)

            if (login_password != results[0].user_password) {

                return res.status(401).render('login', { message: 'Email or password is wrong' });

            } else {

                const userID = results[0].user_ID;
                sql = "call My_Database.MakeCart(?);";
                db.start.query(sql, [userID], (error, results) => {
                    if (error) {

                        console.log("Cart not made");
                    } else {

                        console.log("Cart was made");
                    }
                });
                const token = jwt.sign({ id: userID, admin: true }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });

                const cookieOpt = {

                    expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
                    httpOnlyt: true

                }

                // if successfully login go back to home page
                res.cookie('jwt', token, cookieOpt);
                res.status(200).redirect('/');
            }
        });
    

    } catch (error) {

        console.log(error);
    }
}

// Only for rendered pages, no errors!
exports.isLoggedIn = async (req, res, next) => {
    console.log(req.cookies);
    if (req.cookies.jwt) {
        try {
            // 1) verify token
            const decoded = await promisify(jwt.verify)(
                req.cookies.jwt,
                process.env.JWT_SECRET
            );

            console.log("decoded");
            console.log(decoded);

            // 2) Check if user still exists
            db.start.query('SELECT * FROM users WHERE user_id = ?', [decoded.id], (error, result) => {
                console.log(result)
                if (!result) {
                    return next();
                }
                // THERE IS A LOGGED IN USER
                console.log(result[0][0].user_ID)
                req.user = result[0];
                // res.locals.user = result[0];
                console.log("next")
                return next();
            });
        } catch (err) {
            return next();
        }
    } else {
        next();
    }
};

exports.logout = (req, res) => {
    res.cookie('jwt', 'loggedout', {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true
    });
    res.status(200).redirect("/");
};
