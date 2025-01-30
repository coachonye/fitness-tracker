const User = require('../models/User');
const bcrypt = require('bcryptjs');

// Display login form
exports.getLogin = (req, res) => {
    res.render('auth/login', { title: 'Login' });
};

// Handle login form submission
exports.postLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user || !await bcrypt.compare(password, user.password)) {
            return res.render('auth/login', { 
                error: 'Invalid email or password',
                email: email,
                title: 'Login'
            });
        }

        req.session.userId = user._id;
        res.redirect('/');
    } catch (error) {
        console.error('Login error:', error);
        res.render('auth/login', { 
            error: 'An error occurred during login',
            email: req.body.email,
            title: 'Login'
        });
    }
};

// Display signup form
exports.getSignup = (req, res) => {
    res.render('auth/signup', { title: 'Sign Up' });
};

// Handle signup form submission
exports.postSignup = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.render('auth/signup', {
                error: 'Email already registered',
                username,
                email,
                title: 'Sign Up'
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const user = new User({
            username,
            email,
            password: hashedPassword
        });

        await user.save();
        req.session.userId = user._id;
        res.redirect('/');
    } catch (error) {
        console.error('Signup error:', error);
        res.render('auth/signup', {
            error: 'An error occurred during signup',
            username: req.body.username,
            email: req.body.email,
            title: 'Sign Up'
        });
    }
};

// Handle logout
exports.logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Logout error:', err);
        }
        res.redirect('/login');
    });
};