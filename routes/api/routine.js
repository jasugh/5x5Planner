const express = require('express');
const router = express.Router();
const passport = require('passport');
const moment = require('moment');

// Load validation
const validateRoutineInput = require('../../validation/routine');

// Load Routine Model
const Routine = require('../../models/Routine');
// Load User Model
const User = require('../../models/User');
// Load Plan Model
const Plan = require('../../models/Plan');

// @route   GET api/routine
// @desc    Get current routine
// @access  Private
router.get('/list', passport.authenticate('jwt', {session: false}), (req, res) => {

    Routine.findOne({user: req.user.id})
        .then(routine => {
            if (!routine) {
                result_text = 'There is no routine for this user.';
                return res.status(404).json({msg: result_text})
            }
            res.json(routine);
        })
        .catch(err => res.status(404).json(err));
});

// @route   POST api/routine/update
// @desc    Update routine
// @access  Private
router.post('/update', passport.authenticate('jwt', {session: false}), (req, res) => {

    const {routine_errors, isValid} = validateRoutineInput(req.body);

    // Check Validation
    if (!isValid) {
        // Return any errors with 400 status
        return res.status(400).json(routine_errors);
    }

    const updatedRoutine = {
        week: req.body.week,
        date: req.body.date,
        exercise1: req.body.exercise1,
        exercise1_kg: req.body.exercise1_kg,
        exercise1_reps: req.body.exercise1_reps,
        exercise2: req.body.exercise2,
        exercise2_kg: req.body.exercise2_kg,
        exercise2_reps: req.body.exercise2_reps,
        exercise3: req.body.exercise3,
        exercise3_kg: req.body.exercise3_kg,
        exercise3_reps: req.body.exercise3_reps,
        finished: req.body.finished,
    };

    Routine.findOne(
        {user: req.user.id}, function (err, routine) {
        if (err) {
            return res.status(404).json(err);
        }

        if (routine) {
            const index = routine.workouts.findIndex(wo => moment(wo.date).format("YYYY-MM-DD") === moment(req.body.date).format("YYYY-MM-DD"));
            let wo = routine.workouts;

            if (index >= 0) {
                wo[index] = updatedRoutine;
            } else {
                return res.status(404).json({errMsg: 'Workout date not found.'});
            }

            Routine.findOneAndUpdate(
                {user: req.user.id},
                {$set: {workouts: wo}},
                {new: true}
            ).then(routine => res.json(routine));

        } else {
            return res.status(404).json({errMsg: 'Routine not found.'});
        }
    });
});


// @route   POST api/routine/beginner
// @desc    Create beginner routine
// @access  Private
router.post('/beginner', passport.authenticate('jwt', {session: false}), (req, res) => {

    const errors = {};

    RoutineDay.findOne({user: req.user.id})
        .then(routineDay => {
            if (!routineDay) {
                errors.noRoutineDay = 'There is no Routine Day data for this user';
                return res.status(404).json(errors);
            }
            Plan.findOne({user: req.user.id})
                .then(plan => {
                    if (!plan) {
                        errors.noPlan = 'There is no Plan data for this user';
                        return res.status(404).json(errors);
                    }

                    let squat_kg = 20;
                    let bench_kg = 20;
                    let overhead_kg = 20;
                    let deadlift_kg = 40;
                    let barbell_row_kg = 30;

                    // let wo = [];
                    let sd = plan.start_date;


                    let wo = createRoutine(routineDay, plan, sd, squat_kg, bench_kg, overhead_kg, deadlift_kg, barbell_row_kg);

                    // // Workout A (add the first day here)
                    // wo.push(addWorkout(
                    //     1, sd,
                    //     routineDay.exercise11, routineDay.exercise12, routineDay.exercise13,
                    //     squat_kg, bench_kg, barbell_row_kg
                    // ));
                    //
                    // // The are 3 workouts per week and 12 weeks
                    // let w = 1;
                    // let c = 1;
                    //
                    // for (let i = 0; i < 18; i++) {
                    //     squat_kg = squat_kg + 2.5;
                    //
                    //     c++;
                    //     if (c > 3) {
                    //         c = 1;
                    //         w++;
                    //         if (w > 12) {
                    //             break;
                    //         }
                    //         sd = addDays(sd, 3);
                    //         // Workout B
                    //         wo.push(addWorkout(
                    //             w, sd,
                    //             routineDay.exercise21, routineDay.exercise22, routineDay.exercise23,
                    //             squat_kg, overhead_kg, deadlift_kg
                    //         ));
                    //     } else {
                    //         sd = addDays(sd, 2);
                    //         // Workout B
                    //         wo.push(addWorkout(
                    //             w, sd,
                    //             routineDay.exercise21, routineDay.exercise22, routineDay.exercise23,
                    //             squat_kg, overhead_kg, deadlift_kg
                    //         ));
                    //     }
                    //
                    //     //Add 2.5 kg to every workout (except deadlift)
                    //     squat_kg = squat_kg + 2.5;
                    //     bench_kg = bench_kg + 2.5;
                    //     barbell_row_kg = barbell_row_kg + 2.5;
                    //     overhead_kg = overhead_kg + 2.5;
                    //     if (deadlift_kg < 100) {
                    //         deadlift_kg = deadlift_kg + 5;
                    //     } else {
                    //         deadlift_kg = deadlift_kg + 2.5;
                    //     }
                    //
                    //     c++;
                    //     if (c > 3) {
                    //         c = 1;
                    //         w++;
                    //         if (w > 12) {
                    //             break;
                    //         }
                    //         sd = addDays(sd, 3);
                    //         // Workout A
                    //         wo.push(addWorkout(
                    //             w, sd,
                    //             routineDay.exercise11, routineDay.exercise12, routineDay.exercise13,
                    //             squat_kg, bench_kg, barbell_row_kg
                    //         ));
                    //     } else {
                    //         sd = addDays(sd, 2);
                    //         // Workout A
                    //         wo.push(addWorkout(
                    //             w, sd,
                    //             routineDay.exercise11, routineDay.exercise12, routineDay.exercise13,
                    //             squat_kg, bench_kg, barbell_row_kg
                    //         ));
                    //     }
                    // }

                    const routineFields = {};
                    routineFields.user = req.user.id;
                    routineFields.start_date = plan.start_date;
                    routineFields.workouts = wo;

                    Routine.findOneAndDelete({user: req.user.id})
                        .then(del => {
                            // Create new Routine
                            new Routine(routineFields)
                                .save()
                                .then(routine => {
                                    result_text = 'Successfully created beginner Routine ' + moment().format('YYYY/MM/DD HH:mm:ss');
                                    return res.status(200).json({msg: result_text})
                                })
                        })
                })
                // Plan
                .catch(err => {
                    res.status(404).json(err)
                });
        })
        // Routine Day
        .catch(err => {
            res.status(404).json(err)
        });
});

// @route   POST api/routine/experienced
// @desc    Create experienced routine
// @access  Private
router.post('/experienced', passport.authenticate('jwt', {session: false}), (req, res) => {

    const errors = {};

    RoutineDay.findOne({user: req.user.id})
        .then(routineDay => {
            if (!routineDay) {
                errors.noRoutineDay = 'There is no Routine Day data for this user';
                return res.status(404).json(errors);
            }
            Plan.findOne({user: req.user.id})
                .then(plan => {
                    if (!plan) {
                        errors.noPlan = 'There is no Plan data for this user';
                        return res.status(404).json(errors);
                    }

                    let squat5RM = estimate5RM(plan.squat_max_kg, plan.squat_max_reps);
                    let bench5RM = estimate5RM(plan.bench_max_kg, plan.bench_max_reps);
                    let overhead5RM = estimate5RM(plan.overhead_max_kg, plan.overhead_max_reps);
                    let deadlift5RM = estimate5RM(plan.deadlift_max_kg, plan.deadlift_max_reps);
                    let barbell_row5RM = estimate5RM(plan.barbell_row_max_kg, plan.barbell_row_max_reps);

                    let squat_kg = startWeights(squat5RM);
                    let bench_kg = startWeights(bench5RM);
                    let overhead_kg = startWeights(overhead5RM);
                    let deadlift_kg = startWeights(deadlift5RM);
                    let barbell_row_kg = startWeights(barbell_row5RM);

                    // let wo = [];
                    let sd = plan.start_date;

                    let wo = createRoutine(routineDay, plan, sd, squat_kg, bench_kg, overhead_kg, deadlift_kg, barbell_row_kg);


                    // // Workout A (add the first day here)
                    // wo.push(addWorkout(
                    //     1, sd,
                    //     routineDay.exercise11, routineDay.exercise12, routineDay.exercise13,
                    //     squat_kg, bench_kg, barbell_row_kg
                    // ));
                    //
                    // // The are 3 workouts per week and 12 weeks
                    // let w = 1;
                    // let c = 1;
                    //
                    // for (let i = 0; i < 18; i++) {
                    //     squat_kg = squat_kg + 2.5;
                    //
                    //     c++;
                    //     if (c > 3) {
                    //         c = 1;
                    //         w++;
                    //         if (w > 12) {
                    //             break;
                    //         }
                    //         sd = addDays(sd, 3);
                    //         // Workout B
                    //         wo.push(addWorkout(
                    //             w, sd,
                    //             routineDay.exercise21, routineDay.exercise22, routineDay.exercise23,
                    //             squat_kg, overhead_kg, deadlift_kg
                    //         ));
                    //     } else {
                    //         sd = addDays(sd, 2);
                    //         // Workout B
                    //         wo.push(addWorkout(
                    //             w, sd,
                    //             routineDay.exercise21, routineDay.exercise22, routineDay.exercise23,
                    //             squat_kg, overhead_kg, deadlift_kg
                    //         ));
                    //     }
                    //
                    //     //Add 2.5 kg to every workout (except deadlift)
                    //     squat_kg = squat_kg + 2.5;
                    //     bench_kg = bench_kg + 2.5;
                    //     barbell_row_kg = barbell_row_kg + 2.5;
                    //     overhead_kg = overhead_kg + 2.5;
                    //     if (deadlift_kg <= 100) {
                    //         deadlift_kg = deadlift_kg + 5;
                    //     } else {
                    //         deadlift_kg = deadlift_kg + 2.5;
                    //     }
                    //
                    //     c++;
                    //     if (c > 3) {
                    //         c = 1;
                    //         w++;
                    //         if (w > 12) {
                    //             break;
                    //         }
                    //         sd = addDays(sd, 3);
                    //         // Workout A
                    //         wo.push(addWorkout(
                    //             w, sd,
                    //             routineDay.exercise11, routineDay.exercise12, routineDay.exercise13,
                    //             squat_kg, bench_kg, barbell_row_kg
                    //         ));
                    //     } else {
                    //         sd = addDays(sd, 2);
                    //         // Workout A
                    //         wo.push(addWorkout(
                    //             w, sd,
                    //             routineDay.exercise11, routineDay.exercise12, routineDay.exercise13,
                    //             squat_kg, bench_kg, barbell_row_kg
                    //         ));
                    //     }
                    // }

                    const routineFields = {};
                    routineFields.user = req.user.id;
                    routineFields.start_date = plan.start_date;
                    routineFields.workouts = wo;

                    Routine.findOneAndDelete({user: req.user.id})
                        .then(del => {
                            // Create new Routine
                            new Routine(routineFields)
                                .save()
                                .then(routine => {
                                    result_text = 'Successfully created experienced Routine ' + moment().format('YYYY/MM/DD HH:mm:ss');
                                    return res.status(200).json({msg: result_text})
                                })
                        })
                })
                // Plan
                .catch(err => {
                    res.status(404).json(err)
                });
        })
        // Routine Day
        .catch(err => {
            res.status(404).json(err)
        });
});

// @route   POST api/routine/fixed
// @desc    Create routine with fixed starting values
// @access  Private
router.post('/fixed', passport.authenticate('jwt', {session: false}), (req, res) => {

    const errors = {};

    RoutineDay.findOne({user: req.user.id})
        .then(routineDay => {
            if (!routineDay) {
                errors.noRoutineDay = 'There is no Routine Day data for this user';
                return res.status(404).json(errors);
            }

            Plan.findOne({user: req.user.id})
                .then(plan => {
                    if (!plan) {
                        errors.noPlan = 'There is no Plan data for this user';
                        return res.status(404).json(errors);
                    }

                    let squat_kg = plan.squat_max_kg;
                    let bench_kg = plan.bench_max_kg;
                    let overhead_kg = plan.overhead_max_kg;
                    let deadlift_kg = plan.deadlift_max_kg;
                    let barbell_row_kg = plan.barbell_row_max_kg;

                    // let wo = [];
                    let sd = plan.start_date;

                    let wo = createRoutine(routineDay, plan, sd, squat_kg, bench_kg, overhead_kg, deadlift_kg, barbell_row_kg);

                    // // Workout A (add the first day here)
                    // wo.push(addWorkout(
                    //     1, sd,
                    //     routineDay.exercise11, routineDay.exercise12, routineDay.exercise13,
                    //     squat_kg, bench_kg, barbell_row_kg
                    // ));
                    //
                    // // The are 3 workouts per week and 12 weeks
                    // let w = 1;
                    // let c = 1;
                    //
                    // for (let i = 0; i < 18; i++) {
                    //     squat_kg = squat_kg + 2.5;
                    //
                    //     c++;
                    //     if (c > 3) {
                    //         c = 1;
                    //         w++;
                    //         if (w > 12) {
                    //             break;
                    //         }
                    //         sd = addDays(sd, 3);
                    //         // Workout B
                    //         wo.push(addWorkout(
                    //             w, sd,
                    //             routineDay.exercise21, routineDay.exercise22, routineDay.exercise23,
                    //             squat_kg, overhead_kg, deadlift_kg
                    //         ));
                    //     } else {
                    //         sd = addDays(sd, 2);
                    //         // Workout B
                    //         wo.push(addWorkout(
                    //             w, sd,
                    //             routineDay.exercise21, routineDay.exercise22, routineDay.exercise23,
                    //             squat_kg, overhead_kg, deadlift_kg
                    //         ));
                    //     }
                    //
                    //     //Add 2.5 kg to every workout (except deadlift)
                    //     squat_kg = squat_kg + 2.5;
                    //     bench_kg = bench_kg + 2.5;
                    //     barbell_row_kg = barbell_row_kg + 2.5;
                    //     overhead_kg = overhead_kg + 2.5;
                    //     if (deadlift_kg <= 100) {
                    //         deadlift_kg = deadlift_kg + 5;
                    //     } else {
                    //         deadlift_kg = deadlift_kg + 2.5;
                    //     }
                    //
                    //     c++;
                    //     if (c > 3) {
                    //         c = 1;
                    //         w++;
                    //         if (w > 12) {
                    //             break;
                    //         }
                    //         sd = addDays(sd, 3);
                    //         // Workout A
                    //         wo.push(addWorkout(
                    //             w, sd,
                    //             routineDay.exercise11, routineDay.exercise12, routineDay.exercise13,
                    //             squat_kg, bench_kg, barbell_row_kg
                    //         ));
                    //     } else {
                    //         sd = addDays(sd, 2);
                    //         // Workout A
                    //         wo.push(addWorkout(
                    //             w, sd,
                    //             routineDay.exercise11, routineDay.exercise12, routineDay.exercise13,
                    //             squat_kg, bench_kg, barbell_row_kg
                    //         ));
                    //     }
                    // }

                    const routineFields = {};
                    routineFields.user = req.user.id;
                    routineFields.start_date = plan.start_date;
                    routineFields.workouts = wo;

                    Routine.findOneAndDelete({user: req.user.id})
                        .then(del => {
                            // Create new Routine
                            new Routine(routineFields)
                                .save()
                                .then(routine => {
                                    result_text = 'Successfully created routine with fixed starting weights ' + moment().format('YYYY/MM/DD HH:mm:ss');
                                    return res.status(200).json({msg: result_text})
                                })
                        })
                })
                // Plan
                .catch(err => {
                    res.status(404).json(err)
                });
        })
        // Routine Day
        .catch(err => {
            res.status(404).json(err)
        });
});

//
// Add exercises to routine using values which are depending on level of the trainees
//
function createRoutine(routineDay, plan, sd, squat_kg, bench_kg, overhead_kg, deadlift_kg, barbell_row_kg) {

    const weekDays = [];
    for (let i = 0; i < 7; i++) {
        if (i === 6) {
            weekDays[i] = moment.weekdaysShort(0);
        }
        weekDays[i] = moment.weekdaysShort(i + 1);
    }
    const startWeekDay = moment(plan.start_date).format('ddd');

    const dd = [];
    dd[0] = plan.monday;
    dd[1] = plan.tuesday;
    dd[2] = plan.wednesday;
    dd[3] = plan.thursday;
    dd[4] = plan.friday;
    dd[5] = plan.saturday;
    dd[6] = plan.sunday;

    // Selected workout weekdays
    let woWeekDays = [];
    let dayDiff = [];

    for (let i = 0; i < dd.length; i++) {
        if (dd[i] && !dayDiff[i]) {
            woWeekDays.push(weekDays[i]);
            dayDiff.push(i);
        }
    }

    let diff1 = dayDiff[1] - dayDiff[0];
    let diff2 = dayDiff[2] - dayDiff[1];
    let diff3 = dayDiff[0] - dayDiff[2] + 7;
    let diff = [diff1, diff2, diff3];

    let wo = [];

    const startDNumber = woWeekDays.findIndex(function (day) {
        return (startWeekDay === day);
    });

    // The are 3 workouts per week and 12 weeks
    let weekNumber = 1;
    let exerciseNumber = startDNumber + 1;
    let firstExercise = true;

    for (let i = 0; i < 18; i++) {

        if (exerciseNumber > 3) {
            exerciseNumber = 1;
            weekNumber++;
            if (weekNumber > 12) {
                break;
            }
            // Get next workout date
            sd = addDays(sd, diff[2]);
        } else {
            // Get next workout date except when adding the first workout
            if (firstExercise) {
                sd = addDays(sd, 0);
                firstExercise = false;
            } else {
                sd = addDays(sd, diff[exerciseNumber - 2]);
            }
        }
        // Workout A
        wo.push(addWorkout(
            weekNumber, sd,
            routineDay.exercise11, routineDay.exercise12, routineDay.exercise13,
            squat_kg, bench_kg, barbell_row_kg
        ));

        exerciseNumber++;
        //Add 2.5 kg to Squat because it will be added to every workout
        squat_kg = squat_kg + 2.5;

        if (exerciseNumber > 3) {
            exerciseNumber = 1;
            weekNumber++;
            if (weekNumber > 12) {
                break;
            }
            sd = addDays(sd, diff[2]);
        } else {
            sd = addDays(sd, diff[exerciseNumber - 2]);
        }

        // Workout B
        wo.push(addWorkout(
            weekNumber, sd,
            routineDay.exercise21, routineDay.exercise22, routineDay.exercise23,
            squat_kg, overhead_kg, deadlift_kg
        ));

        exerciseNumber++;
        //Add 2.5 kg to every workout (except deadlift)
        squat_kg = squat_kg + 2.5;

        bench_kg = bench_kg + 2.5;
        barbell_row_kg = barbell_row_kg + 2.5;

        overhead_kg = overhead_kg + 2.5;
        if (deadlift_kg <= 100) {
            deadlift_kg = deadlift_kg + 5;
        } else {
            deadlift_kg = deadlift_kg + 2.5;
        }
    }

    return wo;
}

function estimate5RM(max_kg, max_reps) {
    E5RM = max_kg / (1.0278 - (0.0278 * max_reps)) * (1.0278 - (0.0278 * 5));
    E5RM = 2.5 * Math.floor(E5RM / 2.5);

    return E5RM;
}

function startWeights(E5RM) {
    strWeight = E5RM * 0.5;
    strWeight = (2.5 * Math.floor(strWeight / 2.5));

    return strWeight;
}

function addDays(date, days) {
    let newDate = new Date(date);
    newDate.setDate(newDate.getDate() + days);

    return newDate;
}

function addWorkout(week, date, ex1, ex2, ex3, kg1, kg2, kg3) {
    let routineFields = {};
    routineFields.week = week;
    routineFields.date = date;
    routineFields.exercise1 = ex1;
    routineFields.exercise1_kg = kg1;
    routineFields.exercise1_reps = 5;
    routineFields.exercise2 = ex2;
    routineFields.exercise2_kg = kg2;
    routineFields.exercise2_reps = 5;
    routineFields.exercise3 = ex3;
    routineFields.exercise3_kg = kg3;
    routineFields.exercise3_reps = 5;
    routineFields.finished = false;
    return routineFields;
}

function createRoutine_old(routineDay, plan, sd, squat_kg, bench_kg, overhead_kg, deadlift_kg, barbell_row_kg) {

    let wo = [];

    // Workout A (add the first day here)
    wo.push(addWorkout(
        1, sd,
        routineDay.exercise11, routineDay.exercise12, routineDay.exercise13,
        squat_kg, bench_kg, barbell_row_kg
    ));

    // The are 3 workouts per week and 12 weeks
    let w = 1;
    let c = 1;

    for (let i = 0; i < 18; i++) {
        squat_kg = squat_kg + 2.5;

        c++;
        if (c > 3) {
            c = 1;
            w++;
            if (w > 12) {
                break;
            }
            sd = addDays(sd, 3);
            // Workout B
            wo.push(addWorkout(
                w, sd,
                routineDay.exercise21, routineDay.exercise22, routineDay.exercise23,
                squat_kg, overhead_kg, deadlift_kg
            ));
        } else {
            sd = addDays(sd, 2);
            // Workout B
            wo.push(addWorkout(
                w, sd,
                routineDay.exercise21, routineDay.exercise22, routineDay.exercise23,
                squat_kg, overhead_kg, deadlift_kg
            ));
        }

        //Add 2.5 kg to every workout (except deadlift)
        squat_kg = squat_kg + 2.5;
        bench_kg = bench_kg + 2.5;
        barbell_row_kg = barbell_row_kg + 2.5;
        overhead_kg = overhead_kg + 2.5;
        if (deadlift_kg <= 100) {
            deadlift_kg = deadlift_kg + 5;
        } else {
            deadlift_kg = deadlift_kg + 2.5;
        }

        c++;
        if (c > 3) {
            c = 1;
            w++;
            if (w > 12) {
                break;
            }
            sd = addDays(sd, 3);
            // Workout A
            wo.push(addWorkout(
                w, sd,
                routineDay.exercise11, routineDay.exercise12, routineDay.exercise13,
                squat_kg, bench_kg, barbell_row_kg
            ));
        } else {
            sd = addDays(sd, 2);
            // Workout A
            wo.push(addWorkout(
                w, sd,
                routineDay.exercise11, routineDay.exercise12, routineDay.exercise13,
                squat_kg, bench_kg, barbell_row_kg
            ));
        }
    }

    return wo;
}

module.exports = router;