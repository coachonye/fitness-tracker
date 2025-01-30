const User = require('../models/User');

exports.isAuthenticated = async (req, res, next) => {
    if (!req.session.userId) {
        return res.redirect('/login');
    }
    try {
        const user = await User.findById(req.session.userId);
        if (!user) {
            return res.redirect('/login');
        }
        req.user = user;
        res.locals.user = user;
        next();
    } catch (error) {
        console.error('Auth middleware error:', error);
        res.redirect('/login');
    }
};

exports.isGuest = (req, res, next) => {
    if (req.session.userId) {
        return res.redirect('/');
    }
    next();
};