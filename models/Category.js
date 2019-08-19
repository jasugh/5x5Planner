const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
    },
    name: {
        type: String,
        required: true
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

module.exports = Categorys = mongoose.model('categories', CategorySchema);