const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const RoutineSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
    },
    start_date: {
        type: Date,
        required: true
    },
    workouts: [
        {
            week: {
                type: Number,
                required: true
            },
            date: {
                type: Date,
                required: true,
            },
            exercise1: {
                type: String,
                required: true
            },
            exercise1_kg: {
                type: Number,
                required: true
            },
            exercise1_reps: {
                type: Number,
                required: true
            },
            exercise2: {
                type: String,
                required: true
            },
            exercise2_kg: {
                type: Number,
                required: true
            },
            exercise2_reps: {
                type: Number,
                required: true
            },
            exercise3: {
                type: String,
                required: true
            },
            exercise3_kg: {
                type: Number,
                required: true
            },
            exercise3_reps: {
                type: Number,
                required: true
            },
            finished: {
                type: Boolean,
                required: true,
            },
            add_exercises:
                [
                    {
                        add_exercise: {
                            type: String,
                            required: true
                        },
                        add_exercise_kg: {
                            type: Number,
                        },
                        add_exercise_reps: {
                            type: Number,
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

module.exports = Routine = mongoose.model('routines', RoutineSchema);