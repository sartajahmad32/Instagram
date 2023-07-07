const express = require('express');
const signupController = require('../controllers/signupController');
const router = express.Router();




// SignUp Routers
router.post('/signUp', signupController.signUp);
router.post('/login', signupController.login);

module.exports = router;
