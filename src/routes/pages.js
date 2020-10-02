//*********************************************/
// modules used                               *
//*********************************************/
const express = require('express');
const product = require('../seed/product_seeder')
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
    products = product.get_products();
    res.render('menu', { title: 'Menu Page', products: products });
});

router.get('/about', (req, res) => {
    res.render('about', { title: 'About Page' });
});

router.get('/cart', (req, res) => {
    res.render('cart', { title: 'Shopping Cart' });
});


// exports
module.exports = router;