const express = require('express');
const session = require('express-session');
const methodOverride = require('method-override');
const expressLayouts = require('express-ejs-layouts');
const path = require('path');
const connectDB = require('./config/database');
require('dotenv').config();

const app = express();

// Connect to MongoDB
connectDB();

app.use(express.static(path.join(__dirname, 'public')));

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.set('layout', 'layout');

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));

// Make user available to all templates
app.use((req, res, next) => {
    res.locals.user = req.session.userId || null;
    next();
});

// Routes
const authRoutes = require('./routes/auth');
const workoutRoutes = require('./routes/workouts');

// Register routes
app.use('/', authRoutes);
app.use('/workouts', workoutRoutes);

// Home route
app.get('/', (req, res) => {
    res.render('index', { 
        title: 'Fitness Tracker',
        workouts: []
    });
});

// Error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).render('error', { 
        error: 'Something went wrong!',
        title: 'Error'
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});