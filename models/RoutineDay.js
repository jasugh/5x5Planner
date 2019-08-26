const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const RoutineDaySchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    // Workout A
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
    add_exerciseA:
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
    // Workout B
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
    add_exerciseB:
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

    add_exerciseDay:
        [
            {
                week_day:{
                    type: String,
                    required: true
                },
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
    date: {
        type: Date,
        default: Date.now
    },
});

module.exports = RoutineDay = mongoose.model('routinedays', RoutineDaySchema);