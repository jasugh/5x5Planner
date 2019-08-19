const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Load validation
const validateRoutineDayInput = require('../../validation/routineDay');
// Load Profile Model
const RoutineDay = require('../../models/RoutineDay');

// @route   GET api/routineday/test
// @desc    Tests routineday route
// @access  Public
router.get('/test', (req, res) => res.json({msg: 'Routine Day route works'}));

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

// @route   POST api/routineday
// @desc    Create or update routine days
// @access  Private
router.post('/', passport.authenticate('jwt', {session: false}), (req, res) => {

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

module.exports = router;
