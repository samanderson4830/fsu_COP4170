//*********************************************/
// modules used                               *
//*********************************************/
const express = require('express');
const router = express.Router();

//*********************************************/
// pages in use                               *
//*********************************************/
router.get('/', (req, res) => {
    res.render('../src/views/index');
});

router.get('/login', (req, res) => {
    res.render('../src/views/login');
});
  
router.get('/register', (req, res) => {
    res.render('../src/views/register');
});

// exports
module.exports = router;