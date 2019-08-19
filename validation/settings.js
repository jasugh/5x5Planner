const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateCategoryInput(data) {
    let errors = {};

    //Date format
    data.dateFormat = !isEmpty(data.dateFormat) ? data.dateFormat : '';
    if (Validator.isEmpty(data.dateFormat)) {
        errors.dateFormat = 'Date format is required';
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
