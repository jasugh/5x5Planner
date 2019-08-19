const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const RoutineDaySchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    // Day 1
    exercise11: {
        type: String,
        required: true,
        max: 40
    },
    exercise12: {
        type: String,
        required: true,
        max: 40
    },
    exercise13: {
        type: String,
        required: true,
        max: 40
    },
    add_exercise1:
        [
            {
                add_exercise: {
                    type: String,
                    required: true
                },
                add_exercise_kg: {
                    type: Number,
                    required: true
                },
                add_exercise_reps: {
                    type: Number,
                    required: true
                },

            }
        ],
    // Day 2
    exercise21: {
        type: String,
        required: true,
        max: 40
    },
    exercise22: {
        type: String,
        required: true,
        max: 40
    },
    exercise23: {
        type: String,
        required: true,
        max: 40
    },
    date: {
        type: Date,
        default: Date.now
    },
    add_exercise2:
        [
            {
                add_exercise: {
                    type: String,
                    required: true
                },
                add_exercise_kg: {
                    type: Number,
                    required: true
                },
                add_exercise_reps: {
                    type: Number,
                    required: true
                },

            }
        ]
});

module.exports = RoutineDay = mongoose.model('routinedays', RoutineDaySchema);