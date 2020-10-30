//*********************************************/
// modules used                               *
//*********************************************/
const express = require('express');

/* files used */
const register_controller = require('../controllers/register_controller');
const login_controller    = require('../controllers/login_controller');

const router = express.Router();
//*********************************************/

// routes
router.post('/register', register_controller.register);

router.post('/login', login_controller.login);

// exports
module.exports = router;