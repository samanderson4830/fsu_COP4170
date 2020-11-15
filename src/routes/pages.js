//*********************************************/
// modules used                               *
//*********************************************/
const express = require('express');
const jwt = require('jsonwebtoken');

/* files used */
const authController = require('../controllers/login_controller');
const product = require('../seed/product_seeder');
const user = require('../seed/user_seeder')
const orders = require('../seed/orders_seeder');
const cart = require('../controllers/cart_controller');
const user_cart = require('../seed/cart_seeder');
const contact = require('../seed/contact_seeder');
const days = require('../seed/days_seeder');
const router = express.Router();

// Global Variables ****************************/
const adminID = 1;
const cartID = 1;


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
    res.render('menu', { title: 'Menu Page', products: product.get_products()});
});

router.get('/about', (req, res) => {
    var info = contact.get_contact_info(adminID);

    res.render('about', { title: 'About Page', about: info[0].about });
});

router.get('/cart', (req, res) => {
    var decoded = jwt.verify(req.cookies.jwt, process.env.JWT_SECRET);
    const userID = decoded.id;
    var updatedCart = user_cart.populate_cart(userID);

    res.render('cart', { title: 'Shopping Cart', user_cart: updatedCart, cost: user_cart.get_cost });
});

router.get('/forgot-password', (req, res) => {
    res.render('forgot', { title: 'Forgot Password' });
});

router.get('/account-manager', authController.isLoggedIn, (req, res) => {
    var decoded = jwt.verify(req.cookies.jwt, process.env.JWT_SECRET);
    const userID = decoded.id;
    res.render('manage_accout', {
        title: 'Account Manager', user: user.get_user_info(userID), orders: orders.get_orders(userID),
    });
});

router.get('/edit-account-info', (req, res) => {
    res.render('edit_account', { title: 'Edit Account Info' });
});

router.get('/increment-amount/:id', (req, res) => {
    var decoded = jwt.verify(req.cookies.jwt, process.env.JWT_SECRET);
    const userID = decoded.id;
    console.log("inc +++");
    const productID = req.params.id;
    cart.increment_amount(cartID, productID)
    var updatedCart = user_cart.populate_cart(userID);

    res.render('cart', { title: 'Shopping Cart', user_cart: updatedCart, cost: user_cart.get_cost });
});

router.get('/decrement-amount/:id', (req, res) => {
    var decoded = jwt.verify(req.cookies.jwt, process.env.JWT_SECRET);
    const userID = decoded.id;
    console.log("dec ---");
    const productID = req.params.id;
    cart.decrement_amount(cartID, productID)
    var updatedCart = user_cart.populate_cart(userID);

    res.render('cart', { title: 'Shopping Cart', user_cart: updatedCart, cost: user_cart.get_cost });
});

router.get('/add-to-cart/:id', (req, res) => {
    var decoded = jwt.verify(req.cookies.jwt, process.env.JWT_SECRET);
    const userID = decoded.id;
    const productID = req.params.id;
    cart.add_to_cart(cartID, productID)
    var updatedCart = user_cart.populate_cart(userID);

    res.render('cart', { title: 'Shopping Cart', user_cart: updatedCart, cost: user_cart.get_cost });
});

router.get('/remove-from-cart/:id', (req, res) => {
    var decoded = jwt.verify(req.cookies.jwt, process.env.JWT_SECRET);
    const userID = decoded.id;
    const productID = req.params.id;
    console.log("Product --> " + productID);
    cart.remove(cartID, productID);
    var updatedCart = user_cart.populate_cart(userID);

    res.render('cart', { title: 'Shopping Cart', user_cart: updatedCart, cost: user_cart.get_cost });
});

router.get('/checkout', (req, res) => {
    var decoded = jwt.verify(req.cookies.jwt, process.env.JWT_SECRET);
    const userID = decoded.id;
    var updatedCart = user_cart.populate_cart(userID);
    var myDays = days.day_avaliable();

    res.render('checkout', { title: 'Checkout', user_cart: updatedCart, cost: user_cart.get_cost, days: myDays });
});

// exports
module.exports = router;