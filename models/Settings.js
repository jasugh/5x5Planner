const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SettingsSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
    },
    dateFormat: {
        type: String,
        required: true
    },
    restTime: {
        type: Number,
        required: true,
    },
    weightIncrement: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        default:
        Date.now
    }
});

module.exports = Settings = mongoose.model('settings', SettingsSchema);
