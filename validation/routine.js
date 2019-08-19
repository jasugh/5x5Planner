const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateRoutineInput(data) {
    let routine_errors = {};

    //Exercise 1
    if (!kgRepsOk(data.exercise1_kg)) {
        routine_errors.exercise1_kg = 'Weight is required';
    }
    if (!kgRepsOk(data.exercise1_reps)) {
        routine_errors.exercise1_reps = 'Repetitions are required';
    }

    //Exercise 2
    if (!kgRepsOk(data.exercise2_kg)) {
        routine_errors.exercise2_kg = 'Weight is required';
    }
    if (!kgRepsOk(data.exercise2_reps)) {
        routine_errors.exercise2_reps = 'Repetitions are required';
    }

    //Exercise 3
    if (!kgRepsOk(data.exercise3_kg)) {
        routine_errors.exercise3_kg = 'Weight is required';
    }
    if (!kgRepsOk(data.exercise3_reps)) {
        routine_errors.exercise3_reps = 'Repetitions are required';
    }

    return {
        routine_errors,
        isValid: isEmpty(routine_errors)
    };
};

function kgRepsOk(n) {
    if (isNaN(n)) {
        return false;
    } else {
        if (n < 1) {
            return false;
        }
    }
    return true;
}
