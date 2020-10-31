//*********************************************/
// modules used                               *
//*********************************************/
const express = require('express');

/* files used */
const product = require('../seed/product_seeder');
const user = require('../seed/user_seeder')
const orders = require('../seed/orders_seeder');
const cart = require('../controllers/cart_controller');
const user_cart = require('../seed/cart_seeder');
const router = express.Router();

//*********************************************/
// pages in use                               *
//*********************************************/
router.get('/', (req, res) => {
    res.render('index', { title: 'Home Page' });
});

router.get('/login', (req, res) => {
    res.render('login', { title: 'Login Page' });
});

router.get('/register', (req, res) => {
    res.render('register', { title: 'Register Page' });
});

router.get('/menu', (req, res) => {
    res.render('menu', { title: 'Menu Page', products: product.get_products() });
});

router.get('/about', (req, res) => {
    res.render('about', { title: 'About Page' });
});

router.get('/cart', (req, res) => {
    var user_id = 1;
    user_cart.populate_cart(user_id).then(function (results) {

        res.render('cart', { title: 'Shopping Cart', user_cart: results });

    }).catch(function (err) {
        console.log("** err **" + err);
        console.log("Promise rejection error: " + err);
    });

});

router.get('/forgot-password', (req, res) => {
    res.render('forgot', { title: 'Forgot Password' });
});

router.get('/account-manager', (req, res) => {
    var user_id = 1;
    res.render('manage_accout', {
        title: 'Account Manager',
        user: user.get_user_info('test@test.com'),
        orders: orders.get_orders(user_id),
    });
});

router.get('/edit-account-info', (req, res) => {
    res.render('edit_account', { title: 'Edit Account Info' });
});

router.get('/add-to-cart/:id', (req, res) => {

    var productID = req.params.id;
    var cartID = 1;
    cart.add_to_cart(cartID, productID);
});

router.get('/checkout', (req, res) => {
    res.render('checkout', { title: 'Checkout' });
});


// exports
module.exports = router;