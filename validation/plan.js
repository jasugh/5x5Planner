const Validator = require('validator');
const isEmpty = require('./is-empty');
const moment = require("moment");

module.exports = function validatePlanInput(data) {
    let errors = {};

    data.start_date = !isEmpty(data.start_date) ? data.start_date : '';


    //Repetitions checked only when 'experienced' plan
    if (data.plan_type === 'experienced') {
        //Squat
        if (!kgRepsOk(data.squat_max_reps)) {
            errors.squat_max_reps = 'Squat max repetitions are required';
        }

        //Bench
        if (!kgRepsOk(data.bench_max_reps)) {
            errors.bench_max_reps = 'Bench max repetitions are required';
        }

        //Overhead
        if (!kgRepsOk(data.overhead_max_reps)) {
            errors.overhead_max_reps = 'Overhead max repetitions are required';
        }

        //Deadlift
        if (!kgRepsOk(data.deadlift_max_reps)) {
            errors.deadlift_max_reps = 'Deadlift max repetitions are required';
        }

        //Barbel row
        if (!kgRepsOk(data.barbell_row_max_reps)) {
            errors.barbell_row_max_reps = 'Barbel row max repetitions are required';
        }

    }

    //Check kilos
    if (data.plan_type !== 'beginner') {
        //Squat
        if (!kgRepsOk(data.squat_max_kg)) {
            errors.squat_max_kg = 'Squat max kilograms are required';
        }

        //Bench
        if (!kgRepsOk(data.bench_max_kg)) {
            errors.bench_max_kg = 'Bench max kilograms are required';
        }

        //Overhead
        if (!kgRepsOk(data.overhead_max_kg)) {
            errors.overhead_max_kg = 'Overhead max kilograms are required';
        }

        //Deadlift
        if (!kgRepsOk(data.deadlift_max_kg)) {
            errors.deadlift_max_kg = 'Deadlift max kilograms are required';
        }

        //Barbel row
        if (!kgRepsOk(data.barbell_row_max_kg)) {
            errors.barbell_row_max_kg = 'Barbel row max kilograms are required';
        }
    }

    //Start date
    if (Validator.isEmpty(data.start_date)) {
        errors.start_date = 'Start date field is required';
    }

    // if (moment(data.start_date).format('YYYY/MM/DD') < moment().format('YYYY/MM/DD')) {
    //     errors.start_date = 'The start date is in the past.';
    // }

    //Assuming that in javascript sunday is always the first day of the week
    let start_date_wd = moment(data.start_date).day();
    if (start_date_wd === 0) {
        start_date_wd = 6;
    } else {
        start_date_wd--;
    }

    let wo_dates = [];

    wo_dates.push(data.monday);
    wo_dates.push(data.tuesday);
    wo_dates.push(data.wednesday);
    wo_dates.push(data.thursday);
    wo_dates.push(data.friday);
    wo_dates.push(data.saturday);
    wo_dates.push(data.sunday);

    let num = wo_dates.filter(c => c === true).length;

    if (num !== 3) {
        errors.workout_days = 'Please, select exactly 3 week days.';
    } else {
        if (wo_dates[start_date_wd] !== true) {
            errors.workout_days = 'Start date\'\s weekday is not selected.';
        } else {
            for (i = 0; i <= wo_dates.length; i++) {
                if (i < wo_dates.length) {
                    // Sunday and monday selected
                    if (i === wo_dates.length - 1) {
                        if (wo_dates[i] === true && wo_dates[0] === true) {
                            errors.workout_days = 'Training days are following each other without a rest day.';
                        }
                    }
                    if (wo_dates[i] === true && wo_dates[i + 1] === true) {
                        errors.workout_days = 'Training days are following each other without a rest day.';
                    }
                }
            }
        }
    }
    return {
        errors,
        isValid: isEmpty(errors)
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
