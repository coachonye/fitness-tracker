const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
        enum: ['cardio', 'strength', 'yoga']
    },
    duration: {
        type: Number,
        required: true,
        min: 1
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    description: {
        type: String,
        trim: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Workout', workoutSchema);