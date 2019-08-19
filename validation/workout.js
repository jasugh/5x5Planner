const Validator = require('validator');
const isEmpty = require('./is-empty');
const moment = require('moment');

module.exports = function validateWorkoutInput(data) {
    let errors = {};

    const d = moment(data.workout_date, "YYYY-MM-DD", true);

    if(!d.isValid()){
        errors.workout_date = 'Workout date is not valid ' + d;
    }

    if(moment(data.workout_date).format("YYYY-MM-DD") < moment(new Date()).format("YYYY-MM-DD")){
        errors.workout_date = 'Workout date is in the past';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};
