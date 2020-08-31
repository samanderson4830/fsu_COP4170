//*********************************************/
// modules used                               *
//*********************************************/
const express = require('express');
const router = express.Router();

//*********************************************/
// pages in use                               *
//*********************************************/
router.get('/', (req, res) => {
    res.render('index');
});

router.get('/login', (req, res) => {
    res.render('login');
});
  
router.get('/register', (req, res) => {
    res.render('register');
});

// exports
module.exports = router;