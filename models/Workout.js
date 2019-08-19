const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const WorkoutSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
    },
    workout_date: {
        type: Date,
        required: true
    },
    exercises: [
        {
            exercise: {
                type: String,
                required: true
            },
            sets: [
                {
                    weight: {
                        type: Number,
                        required: false
                    },
                    reps: {
                        type: Number,
                        required: false
                    },
                    comment: {
                        type: String,
                    },
                    finished: {
                        type: Boolean,
                        // required: true,
                    }
                }
            ]
        }
    ],
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Workouts = mongoose.model('workouts', WorkoutSchema);