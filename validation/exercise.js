const Validator = require('validator');
const isEmpty = require('./is-empty');
const moment = require('moment');

module.exports = function validateExerciseInput(data) {
    let errors = {};

    //Exercise name
    data.name = !isEmpty(data.name) ? data.name : '';
    if (Validator.isEmpty(data.name)) {
        errors.name = 'Exercise name is required';
    }

    //Category
    data.category = !isEmpty(data.category) ? data.category : '';
    if (Validator.isEmpty(data.category)) {
        errors.category = 'Category name is required';
    }

    //Rest time
    if (!numericOk(data.restTime)) {
        errors.restTime = 'Rest time is required';
    }

    //Weight increment
    if (!numericOk(data.weightIncrement)) {
        errors.weightIncrement = 'Weight Increment is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};

function numericOk(n) {
    if (isNaN(n)) {
        return false;
    } else {
        if (n < 0.5) {
            return false;
        }
    }
    return true;
}
