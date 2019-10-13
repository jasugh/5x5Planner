const express = require('express');
const router = express.Router();
const passport = require('passport');
const moment = require('moment');

//Validation
const validateWorkoutInput = require('../../validation/workout');

// Load Routine Model
const Routine = require('../../models/Routine');
// Load Workout Model
const Workout = require('../../models/Workout');
// Load User Model
const User = require('../../models/User');

// @route   POST api/workout
// @desc    Create new workout (exercises from routine plan) by date
// @access  Private
router.post('/', passport.authenticate('jwt', {session: false}), (req, res) => {

    const workoutDate = req.body.workout_date;

    Workout.findOne({
        user: req.user.id,
        workout_date: workoutDate
    })
        .then(workout => {
            if (workout) {
                // workout was already created -> return
                const result_text = 'Workout found for date ' + moment(workoutDate).format('YYYY-MM-DD');
                return res.status(200).json({msg: result_text})
            } else {
                const {errors, isValid} = validateWorkoutInput(req.body);

                // Check Validation
                if (!isValid) {
                    // Return any errors with 400 status
                    return res.status(400).json(errors);
                }

                Routine.findOne({user: req.user.id})
                    .then(routine => {
                        if (!routine) {
                            return res.status(404).json({user: 'There is no routine for this user.'})
                        }

                        const index = routine.workouts.findIndex(d => moment(d.date).format("YYYY-MM-DD") === moment(workoutDate).format("YYYY-MM-DD"));

                        if (index < 0) {
                            let text = 'There are no planned workouts for date ' + moment(workoutDate).format('YYYY-MM-DD');
                            return res.status(404).json({date: text})
                        }

                        // Add 5x5 exercises
                        let exercises = [];

                        exercises.push(routine.workouts[index].exercise1);
                        exercises.push(routine.workouts[index].exercise2);
                        exercises.push(routine.workouts[index].exercise3);

                        let kgs = [];
                        let reps = [];
                        kgs.push(routine.workouts[index].exercise1_kg);
                        reps.push(routine.workouts[index].exercise1_reps);
                        kgs.push(routine.workouts[index].exercise2_kg);
                        reps.push(routine.workouts[index].exercise2_reps);
                        kgs.push(routine.workouts[index].exercise3_kg);
                        reps.push(routine.workouts[index].exercise3_reps);

                        let workouts = [];
                        let sets = [];

                        for (let i = 0; i < exercises.length; i++) {
                            let ii = 0;
                            while (ii < 5) {
                                const set = {
                                    weight: kgs[i],
                                    reps: reps[i],
                                    comment: '',
                                    finished: false,
                                };
                                sets.push(set);
                                ii++;
                            }

                            let exerciseName = exercises[i];
                            const exercise = {
                                exercise: exerciseName,
                                sets: sets
                            };

                            workouts.push(exercise);
                            sets = [];
                        }

                        // Add additional exercises
                        const set = {
                            weight: 0,
                            reps: 1,
                            comment: '',
                            finished: false,
                        };
                        sets.push(set);

                        exercises = [];
                        for(i = 0; i < routine.workouts[index].add_exercises.length; i++){
                            const exercise = {
                                exercise: routine.workouts[index].add_exercises[i].add_exercise,
                                sets: sets
                            };
                            workouts.push(exercise);
                        }
                        sets = [];

                        // Add exercises to workouts
                        const workoutFields = {};
                        workoutFields.user = req.user.id;
                        workoutFields.workout_date = workoutDate;
                        workoutFields.exercises = workouts;

                        Workout.findOneAndDelete({
                            user: req.user.id,
                            workout_date: workoutDate
                        })
                            .then(del => {

                                // Create new Workout
                                new Workout(workoutFields)
                                    .save()
                                    .then(workout => {
                                        // return res.status(200).json({workout})
                                        const result_text = 'New workout created for date ' + moment(workoutDate).format('YYYY-MM-DD');
                                        return res.status(200).json({msg: result_text})
                                    })
                            })

                    })
                    .catch(err => res.status(404).json(err));

            }
        })
        .catch(err => res.status(404).json(err));
});

// @route   POST api/workout/update
// @desc    Update a workout after all the exercises are finished
// @access  Private
router.post('/update', passport.authenticate('jwt', {session: false}), (req, res) => {

    const errors = {};

    let d = moment(req.body.workout_date).utc(true);
    d.set({hour: 0, minute: 0, second: 0, millisecond: 0});

    Workout.findOne({
        user: req.user.id,
        workout_date: d.toISOString(),
    })
        .then(workout => {

            if (!workout) {
                errors.no_workout = 'There is no workout for this date: ' + d.toISOString();
                return res.status(404).json(errors);
            }

            let w = workout;
            let e = workout.exercises;

            // Get index
            const returnIndex = workout.exercises
                .map(e => e.exercise)
                .indexOf(req.body.exercises[0].exercise);

            e[returnIndex] = req.body.exercises[0];
            w.exercises = e;

            Workout.findOneAndDelete({
                user: req.user.id,
                workout_date: d.toISOString(),
            })
                .then(del => {

                    const workoutFields = {};
                    workoutFields.user = req.user.id;
                    workoutFields.workout_date = req.body.workout_date;
                    workoutFields.exercises = w.exercises;


                    // Create new Workout
                    new Workout(workoutFields)
                        .save()
                        .then(workout => {
                            result_text = 'Workout date ' + moment(d).format('YYYY-MM-DD');
                            return res.status(200).json({msg: result_text})
                        })
                })
                .catch(err => res.status(404).json(err));
        })
        .catch(err => res.status(404).json(err));

});

// @route   GET api/workout/select
// @desc    Get workout by date and exercise
// @access  Private
router.get('/select/', passport.authenticate('jwt', {session: false}), (req, res) => {

    const errors = {};

    let d = moment(req.query.workout_date).utc(true);
    d.set({hour: 0, minute: 0, second: 0, millisecond: 0});

    Workout.findOne({
        user: req.user.id,
        workout_date: d.toISOString(),
    })
        .then(workout => {

            if (!workout) {
                errors.no_workout = 'There is no workout for this date: ' + d.toISOString();
                return res.status(404).json(errors);
            }

            // Get index
            const returnIndex = workout.exercises
                .map(e => e.exercise)
                .indexOf(req.query.exercise);

            workout.exercises = workout.exercises.splice(returnIndex, 1);
            return res.status(200).json({workout})
        })
        .catch(err => res.status(404).json(err));
});

// @route   GET api/workout/:workout_date
// @desc    Get workouts by date
// @access  Private
router.get('/date/:workout_date', passport.authenticate('jwt', {session: false}), (req, res) => {

    const errors = {};

    let d = moment(req.params.workout_date).utc(true);
    d.set({hour: 0, minute: 0, second: 0, millisecond: 0});

    Workout.findOne({
        user: req.user.id,
        workout_date: d.toISOString()
    })
        .then(workout => {

            if (!workout) {
                errors.no_workout = 'There is no workout for this date: ' + d.toISOString();
                return res.status(404).json(errors);
            }
            return res.status(200).json({workout})
        })
        .catch(err => res.status(404).json(err));
});

module.exports = router;