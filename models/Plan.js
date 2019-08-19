const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const PlanSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    plan_name: {
        type: String,
        required: false,
    },
    plan_type: {
        type: String,
        required: true,
        default: 'beginner'
    },
    //TODO: Talleta vain viikonpäivät jotka on valittu. Tauluun?
    monday: {
        type: Boolean,
        required: true,
    },
    tuesday: {
        type: Boolean,
        required: true,
    },
    wednesday: {
        type: Boolean,
        required: true,
    },
    thursday: {
        type: Boolean,
        required: true,
    },
    friday: {
        type: Boolean,
        required: true,
    },
    saturday: {
        type: Boolean,
        required: true,
    },
    sunday: {
        type: Boolean,
        required: true,
    },
    // Current maximum weights and reps
    squat_max_kg: {
        type: Number,
        required: true
    },
    squat_max_reps: {
        type: Number,
        required: true
    },
    bench_max_kg: {
        type: Number,
        required: true
    },
    bench_max_reps: {
        type: Number,
        required: true
    },
    overhead_max_kg: {
        type: Number,
        required: true
    },
    overhead_max_reps: {
        type: Number,
        required: true
    },
    deadlift_max_kg: {
        type: Number,
        required: true
    },
    deadlift_max_reps: {
        type: Number,
        required: true
    },
    barbell_row_max_kg: {
        type: Number,
        required: true
    },
    barbell_row_max_reps: {
        type: Number,
        required: true
    },
    // Start date
    start_date: {
        type: Date,
        default: Date.now
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Plan = mongoose.model('plans', PlanSchema);
