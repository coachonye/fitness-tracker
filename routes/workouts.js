const express = require('express');
const router = express.Router();
const workoutController = require('../controllers/workoutController');
const { isAuthenticated } = require('../middleware/auth');

// Apply authentication middleware to all workout routes
router.use(isAuthenticated);

// GET /workouts - Display all workouts
router.get('/', workoutController.getWorkouts);

// GET /workouts/new - Display workout creation form
router.get('/new', workoutController.getNewWorkout);

// POST /workouts - Create new workout
router.post('/', workoutController.createWorkout);

// GET /workouts/:id - Display single workout
router.get('/:id', workoutController.getWorkout);

// GET /workouts/:id/edit - Display workout edit form
router.get('/:id/edit', workoutController.getEditWorkout);

// PUT /workouts/:id - Update workout
router.put('/:id', workoutController.updateWorkout);

// DELETE /workouts/:id - Delete workout
router.delete('/:id', workoutController.deleteWorkout);

module.exports = router;