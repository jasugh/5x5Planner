const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Load validation
const validateRoutineDayInput = require('../../validation/routineDay');
const validateAddAB = require('../../validation/addAB');

// Load Routine Day Model
const RoutineDay = require('../../models/RoutineDay');

// @route   POST api/routineday/add
// @desc    Create or update routine days
// @access  Private
router.post('/add', passport.authenticate('jwt', {session: false}), (req, res) => {

    const {errors, isValid} = validateRoutineDayInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    // Get fields
    const routineDayFields = {};
    routineDayFields.user = req.user.id;

    routineDayFields.exercise11 = req.body.exercise11;
    routineDayFields.exercise12 = req.body.exercise12;
    routineDayFields.exercise13 = req.body.exercise13;

    routineDayFields.exercise21 = req.body.exercise21;
    routineDayFields.exercise22 = req.body.exercise22;
    routineDayFields.exercise23 = req.body.exercise23;

    RoutineDay.findOne({user: req.user.id})
        .then(routine_day => {
            if (routine_day) {
                // Update
                RoutineDay.findOneAndUpdate(
                    {user: req.user.id},
                    {$set: routineDayFields},
                    {new: true}
                ).then(routineDay => res.json(routineDay));
            } else {
                // Save Routine Day
                new RoutineDay(routineDayFields).save()
                    .then(routineDay => res.json(routineDay))
            }
        });
});

// @route   GET api/routineday
// @desc    Get current routine day
// @access  Private
router.get('/', passport.authenticate('jwt', {session: false}), (req, res) => {

    const errors = {};

    RoutineDay.findOne({user: req.user.id})
        .then(routineDay => {
            if (!routineDay) {
                errors.noRoutineDay = 'There is no Routine Day data for this user';
                return res.status(400).json(errors);
            }
            res.json(routineDay);
        })
        .catch(err => res.status(404).json(err));
});

// @route   POST api/routineday/addab
// @desc    Create or update routine days
// @access  Private
router.post('/addab', passport.authenticate('jwt', {session: false}), (req, res) => {

    const errors = {};
    // const {errors, isValid} = validateAddAB(req.body);
    //
    // if (!isValid) {
    //     return res.status(400).json(errors);
    // }

    let aeA = [];
    for (let i = 0; i < req.body.add_exerciseA.length; i++) {
        let add_exerciseFields = {
            add_exercise: req.body.add_exerciseA[i].add_exercise,
            add_exercise_kg: 0,
            add_exercise_reps: 0,
        };
        aeA.push(add_exerciseFields);
    }

    let aeB = [];
    for (let i = 0; i < req.body.add_exerciseB.length; i++) {
        let add_exerciseFields = {
            add_exercise: req.body.add_exerciseB[i].add_exercise,
            add_exercise_kg: 0,
            add_exercise_reps: 0,
        };
        aeB.push(add_exerciseFields);
    }

    RoutineDay.findOne({user: req.user.id})
        .then(routine_day => {
            if (routine_day) {


                // Update
                RoutineDay.findOneAndUpdate(
                    {user: req.user.id},
                    {
                        $set: {
                            add_exerciseA: aeA,
                            add_exerciseB: aeB
                        }
                    },
                    {new: true}
                ).then(routineDay => res.json(routineDay));
            } else {
                res.status(400).json({msg: 'No routine data found. Enter Workout A and B first.'})
            }
        })
        .catch(err => res.status(404).json(err));
});

// @route   POST api/routineday/addab
// @desc    Create or update routine days
// @access  Private
router.post('/addday', passport.authenticate('jwt', {session: false}), (req, res) => {

    const errors = {};
    // const {errors, isValid} = validateAddAB(req.body);
    //
    // if (!isValid) {
    //     return res.status(400).json(errors);
    // }

    let aeD = [];
    for (let i = 0; i < req.body.add_exerciseDay.length; i++) {
        let add_exerciseFields = {
            week_day: req.body.add_exerciseDay[i].week_day,
            add_exercise: req.body.add_exerciseDay[i].add_exercise,
            add_exercise_kg: 0,
            add_exercise_reps: 0,
        };
        aeD.push(add_exerciseFields);
    }

    RoutineDay.findOne({user: req.user.id})
        .then(routine_day => {
            if (routine_day) {


                // Update
                RoutineDay.findOneAndUpdate(
                    {user: req.user.id},
                    {$set: {add_exerciseDay: aeD}},
                    {new: true}
                ).then(routineDay => res.json(routineDay));
            } else {
                res.status(400).json({msg: 'No routine data found. Enter Workout A and B first.'})
            }
        })
        .catch(err => res.status(404).json(err));
});

module.exports = router;
