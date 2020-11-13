//*********************************************/
// modules used                               *
//*********************************************/
const express = require('express');

/* files used */
const register_controller = require('../controllers/register_controller');
const login_controller    = require('../controllers/login_controller');
const checkout_controller = require('../controllers/checkout_controller');
//const cart_controller     = require('../controllers/cart_controller');
const router = express.Router();
//*********************************************/

// routes
router.post('/register', register_controller.register);

router.post('/login', login_controller.login);

router.post('/checkout', checkout_controller.checkout);

//router.post('/add-to-cart/:id', checkout_controller.checkout);

// exports
module.exports = router;