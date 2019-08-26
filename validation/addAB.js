const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateRoutineDayInput(data) {
    let errors = {};

    data.exercise11 = !isEmpty(data.exercise11) ? data.exercise11 : '';
    if (Validator.isEmpty(data.exercise11)) {
        errors.exercise11 = 'Workout A: Exercise 1 field is required';
    }

    data.exercise12 = !isEmpty(data.exercise12) ? data.exercise12 : '';
    if (Validator.isEmpty(data.exercise12)) {
        errors.exercise12 = 'Workout A: Exercise 2 field is required';
    }

    data.exercise13 = !isEmpty(data.exercise13) ? data.exercise13 : '';
    if (Validator.isEmpty(data.exercise13)) {
        errors.exercise13 = 'Workout A: Exercise 3 field is required';
    }

    data.exercise21 = !isEmpty(data.exercise21) ? data.exercise21 : '';
    if (Validator.isEmpty(data.exercise21)) {
        errors.exercise21 = 'Workout B: Exercise 1 field is required';
    }

    data.exercise22 = !isEmpty(data.exercise22) ? data.exercise22 : '';
    if (Validator.isEmpty(data.exercise22)) {
        errors.exercise22 = 'Workout B: Exercise 2 field is required';
    }

    data.exercise23 = !isEmpty(data.exercise23) ? data.exercise23 : '';
    if (Validator.isEmpty(data.exercise23)) {
        errors.exercise23 = 'Workout B: Exercise 3 field is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};
