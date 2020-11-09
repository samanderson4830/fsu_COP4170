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
    const user_id = 1;
    res.render('cart', { title: 'Shopping Cart', user_cart: user_cart.populate_cart(user_id), cost: user_cart.get_cost });
});

router.get('/forgot-password', (req, res) => {
    res.render('forgot', { title: 'Forgot Password' });
});

router.get('/account-manager', (req, res) => {
    const user_id = 1;

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
    const user_id = 1;
    const productID = req.params.id;
    const cartID = 1;

    // var myCart = user_cart.populate_cart(user_id);
    // var cost = user_cart.get_cost(myCart);
    
    cart.add_to_cart(cartID, productID)

    //res.render('cart', { title: 'Shopping Cart', user_cart: myCart, cost: cost });

});

router.get('/checkout', (req, res) => {
    const user_id = 1;

    res.render('checkout', { title: 'Checkout', user_cart:  user_cart.populate_cart(user_id), cost: user_cart.get_cost });
});


// exports
module.exports = router;