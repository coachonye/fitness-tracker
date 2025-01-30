const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { isGuest } = require('../middleware/auth');

// GET /login - Display login form
router.get('/login', isGuest, authController.getLogin);

// POST /login - Handle login form submission
router.post('/login', isGuest, authController.postLogin);

// GET /signup - Display signup form
router.get('/signup', isGuest, authController.getSignup);

// POST /signup - Handle signup form submission
router.post('/signup', isGuest, authController.postSignup);

// GET /logout - Handle logout
router.get('/logout', authController.logout);

module.exports = router;