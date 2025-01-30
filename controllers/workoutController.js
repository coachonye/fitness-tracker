const Workout = require('../models/workout');

// Display all workouts
exports.getWorkouts = async (req, res) => {
    try {
        const workouts = await Workout.find({ user: req.user._id })
            .sort('-date');
        res.render('workouts/index', { workouts });
    } catch (error) {
        console.error('Error fetching workouts:', error);
        res.render('workouts/index', { 
            workouts: [],
            error: 'Error fetching workouts' 
        });
    }
};

// Display workout creation form
exports.getNewWorkout = (req, res) => {
    res.render('workouts/new');
};

// Create new workout
exports.createWorkout = async (req, res) => {
    try {
        const { type, duration, date, description } = req.body;
        const workout = new Workout({
            type,
            duration,
            date,
            description,
            user: req.user._id
        });
        await workout.save();
        res.redirect('/workouts');
    } catch (error) {
        console.error('Error creating workout:', error);
        res.render('workouts/new', {
            error: 'Error creating workout',
            workout: req.body
        });
    }
};

// Display single workout
exports.getWorkout = async (req, res) => {
    try {
        const workout = await Workout.findById(req.params.id);
        if (!workout || workout.user.toString() !== req.user._id.toString()) {
            return res.status(404).render('error', { 
                error: 'Workout not found' 
            });
        }
        res.render('workouts/show', { workout });
    } catch (error) {
        console.error('Error fetching workout:', error);
        res.status(404).render('error', { 
            error: 'Error fetching workout' 
        });
    }
};

// Display workout edit form
exports.getEditWorkout = async (req, res) => {
    try {
        const workout = await Workout.findById(req.params.id);
        if (!workout || workout.user.toString() !== req.user._id.toString()) {
            return res.status(404).render('error', { 
                error: 'Workout not found' 
            });
        }
        res.render('workouts/edit', { workout });
    } catch (error) {
        console.error('Error fetching workout:', error);
        res.status(404).render('error', { 
            error: 'Error fetching workout' 
        });
    }
};

// Update workout
exports.updateWorkout = async (req, res) => {
    try {
        const { type, duration, date, description } = req.body;
        const workout = await Workout.findById(req.params.id);
        
        if (!workout || workout.user.toString() !== req.user._id.toString()) {
            return res.status(404).render('error', { 
                error: 'Workout not found' 
            });
        }

        workout.type = type;
        workout.duration = duration;
        workout.date = date;
        workout.description = description;

        await workout.save();
        res.redirect(`/workouts/${workout._id}`);
    } catch (error) {
        console.error('Error updating workout:', error);
        res.render('workouts/edit', {
            error: 'Error updating workout',
            workout: { ...req.body, _id: req.params.id }
        });
    }
};

// Delete workout
exports.deleteWorkout = async (req, res) => {
    try {
        const workout = await Workout.findById(req.params.id);
        if (!workout || workout.user.toString() !== req.user._id.toString()) {
            return res.status(404).render('error', { 
                error: 'Workout not found' 
            });
        }
        await Workout.findByIdAndDelete(req.params.id);
        res.redirect('/workouts');
    } catch (error) {
        console.error('Error deleting workout:', error);
        res.status(500).render('error', { 
            error: 'Error deleting workout' 
        });
    }
};