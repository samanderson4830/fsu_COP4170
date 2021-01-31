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
const stats = require('../seed/stats_seeder');

const router = express.Router();

// Global Variables ****************************/
const adminID = 0;

//*********************************************/
// pages in use                               *
//*********************************************/
router.get('/', (req, res) => {
    let decoded = jwt.verify(req.cookies.jwt, process.env.JWT_SECRET);
    if (decoded.admin === false) {
        res.render('index', { title: 'Home Page' });
    } else {
        res.render('admin_index', { title: 'Home Page' });
    }
});

router.get('/login', (req, res) => {
    res.render('login', { title: 'Login Page' });
});

router.get('/register', (req, res) => {
    res.render('register', { title: 'Register Page' });
});

router.get('/menu', async (req, res) => {
    res.render('menu', { title: 'Menu Page', products: await product.get_products() });
});

router.get('/about', (req, res) => {
    let info = contact.get_contact_info(adminID);
    if (info[0].about !== undefined) {
        res.render('about', { title: 'About Page', about: info[0].about });
    }
});

router.get('/cart', async (req, res) => {
    const decoded = jwt.verify(req.cookies.jwt, process.env.JWT_SECRET);
    const userID = decoded.id;
    res.render('cart', { title: 'Shopping Cart', user_cart: await user_cart.populate_cart(userID), cost: user_cart.get_cost });
});

router.get('/forgot-password', async (req, res) => {
    res.render('forgot', { title: 'Forgot Password' });
});

router.get('/account-manager', authController.isLoggedIn, async (req, res) => {
    const decoded = jwt.verify(req.cookies.jwt, process.env.JWT_SECRET);
    const userID = decoded.id;

    if (decoded.admin === false) {
        res.render('manage_account', {
            title: 'Account Manager', user: user.get_user_info(userID), orders: await orders.get_orders(userID),
        });
    } else {
        res.render('admin_manager', { title: 'Account Manager', orders: orders.get_all_orders() });
    }
});

router.get('/admin-manager', authController.isLoggedIn, (req, res) => {
    const decoded = jwt.verify(req.cookies.jwt, process.env.JWT_SECRET);

    if (decoded.admin === true) {
        res.render('admin_manager', { title: 'Account Manager' });
    } else {
        res.render('error', { title: 'Error' });
    }
});

router.get('/edit-account-info', (req, res) => {
    res.render('edit_account', { title: 'Edit Account Info' });
});

router.get('/increment-amount/:id', async (req, res) => {
    const decoded = jwt.verify(req.cookies.jwt, process.env.JWT_SECRET);
    const userID = decoded.id;
    const productID = req.params.id;
    const cartID = user.get_user_cartID(userID);
    cart.increment_amount(1, productID)

    console.log("CartID --> " + cartID);

    setTimeout(async function () {
        res.render('cart', {
            title: 'Shopping Cart',
            user_cart: await user_cart.populate_cart(userID),
            cost: user_cart.get_cost
        });
    }, 0)
});

router.get('/decrement-amount/:id', async (req, res) => {
    const decoded = jwt.verify(req.cookies.jwt, process.env.JWT_SECRET);
    const userID = decoded.id;
    const productID = req.params.id;
    let cartID = user.get_user_cartID(userID);
    console.log("CartID --> " + cartID);

    cart.decrement_amount(1, productID)
    let updatedCart = await user_cart.populate_cart(userID);

    res.render('cart', { title: 'Shopping Cart', user_cart: updatedCart, cost: user_cart.get_cost });
});

router.get('/add-to-cart/:id', async (req, res) => {
    const decoded = jwt.verify(req.cookies.jwt, process.env.JWT_SECRET);
    const userID = decoded.id;
    const productID = req.params.id;
    let cartID = user.get_user_cartID(userID);
    console.log("CartID --> " + cartID);
    cart.add_to_cart(1, productID)
    let updatedCart = await user_cart.populate_cart(userID);

    res.render('cart', { title: 'Shopping Cart', user_cart: updatedCart, cost: user_cart.get_cost });
});

router.get('/remove-from-cart/:id', async (req, res) => {
    const decoded = jwt.verify(req.cookies.jwt, process.env.JWT_SECRET);
    const userID = decoded.id;
    const productID = req.params.id;
    let cartID = user.get_user_cartID(userID);
    console.log("CartID --> " + cartID);
    cart.remove(1, productID);
    let updatedCart = await user_cart.populate_cart(userID);

    res.render('cart', { title: 'Shopping Cart', user_cart: updatedCart, cost: user_cart.get_cost });
});

router.get('/checkout', async (req, res) => {
    const decoded = jwt.verify(req.cookies.jwt, process.env.JWT_SECRET);
    const userID = decoded.id;
    let updatedCart = await user_cart.populate_cart(userID);
    let myDays = await days.day_available();

    res.render('checkout', { title: 'Checkout', user_cart: updatedCart, cost: user_cart.get_cost, days: myDays });
});


router.get('/admin-statistics', (req, res) => {
    const decoded = jwt.verify(req.cookies.jwt, process.env.JWT_SECRET);
    
    if (decoded.admin === true) {
        res.render('admin_statistics', {
            title: 'Statistics',
            all_active: stats.total_active_orders,
            all_inactive: stats.total_inactive_orders,
            total_users: stats.total_users,
            total_revenue: stats.total_revenue,
            total_potential_revenue: stats.total_potential_revenue
        });
    } else {
        res.render('error', { title: 'Error' });
    }
});

router.get('/admin-product-quantity', (req, res) => {
    const decoded = jwt.verify(req.cookies.jwt, process.env.JWT_SECRET);
    let quantityArray = product.get_quantity();
    if (decoded.admin === true) {
        res.render('admin_product_quantity', { title: 'Product Quantity', products: quantityArray });
    } else {
        res.render('error', { title: 'Error' });
    }
});


router.get('/admin-popular-product', (req, res) => {
    const decoded = jwt.verify(req.cookies.jwt, process.env.JWT_SECRET);
    let popularArray = product.get_popular();
    if (decoded.admin === true) {
        res.render('admin_popular_products', { title: 'Popular Products', products: popularArray });
    } else {
        res.render('error', { title: 'Error' });
    }
});

router.get('/admin-all-users', async (req, res) => {
    const decoded = jwt.verify(req.cookies.jwt, process.env.JWT_SECRET);
    let usersArray = await user.get_all_users();
    if (decoded.admin === true) {
        res.render('admin_all_users', { title: 'Popular Products', users: usersArray });
    } else {
        res.render('error', { title: 'Error' });
    }
});

router.get('/admin-order-info', (req, res) => {
    const decoded = jwt.verify(req.cookies.jwt, process.env.JWT_SECRET);
    let arrayOrders = orders.get_order_products();
    if (decoded.admin === true) {
        res.render('admin_order_info', { title: 'Order Info', order: arrayOrders });
    } else {
        res.render('error', { title: 'Error' });
    }
});

// exports
module.exports = router;