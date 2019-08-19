const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ExerciseSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
    },
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true,
    },
    restTime: {
        type: Number,
        required: true,
    },
    weightIncrement: {
        type: Number,
        required: true,
    },
    notes: {
        type: String,
    },
    date: {
        type: Date,
        default:
        Date.now
    }
});

module.exports = Exercises = mongoose.model('exercises', ExerciseSchema);