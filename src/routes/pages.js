//*********************************************/
// modules used                               *
//*********************************************/
const express = require('express');
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
    res.render('menu', { title: 'Menu Page' });
});

router.get('/about', (req, res) => {
    res.render('about', { title: 'About Page' });
});



// exports
module.exports = router;