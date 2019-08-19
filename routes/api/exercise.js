const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Load validation
const validateExerciseInput = require('../../validation/exercise');
// Load Exercise Model
const Exercise = require('../../models/Exercise');
// Load User Model
const User = require('../../models/User');

// @route   GET api/exercise
// @desc    Get an exercise
// @access  Private
router.get('/', passport.authenticate('jwt', {session: false}), (req, res) => {

    const errors = {};

    Exercise.findOne(
        {
            user: req.user.id,
            name: req.body.name
        }
    )
        .then(exercise => {
            if (!exercise) {
                errors.noexercise = 'Exercise not found';
                return res.status(404).json(errors);
            }
            res.json(exercise);
        })
        .catch(err => res.status(404).json(err));
});

// @route   GET api/exercise/all
// @desc    Get all exercises
// @access  Private
router.get('/all', passport.authenticate('jwt', {session: false}), (req, res) => {

    const errors = {};

    Exercise.find(
        {
            user: req.user.id,
        }
    )
        .then(exercises => {
            if (!exercises) {
                errors.noexercise = 'There is no exercises for this user';
                return res.status(404).json(errors);
            }
            res.json(exercises);
        })
        .catch(err => res.status(404).json(err));
});


// @route   POST api/exercise
// @desc    Create or update an exercise
// @access  Private
router.post('/add', passport.authenticate('jwt', {session: false}), (req, res) => {

    const {errors, isValid} = validateExerciseInput(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }

    // Get fields
    const exerciseFields = {};
    exerciseFields.user = req.user.id;
    exerciseFields.name = req.body.name;
    exerciseFields.category = req.body.category;
    exerciseFields.restTime = req.body.restTime;
    exerciseFields.weightIncrement = req.body.weightIncrement;
    exerciseFields.notes = req.body.notes;

    Exercise.findOne(
        {
            user: req.user.id,
            name: req.body.name
        }
    ).then(exercise => {
        if (exercise) {
            errors.name = 'That exercise already exists';
            res.status(400).json(errors);
        } else {
            // Create new exercise
            new Exercise(exerciseFields)
                .save().then(exercise => res.json(exercise))
                .catch(err => res.status(400).json(err));
        }
    });
});

// @route   POST api/exercise
// @desc    Create or update an exercise
// @access  Private
router.post('/update', passport.authenticate('jwt', {session: false}), (req, res) => {

    const {errors, isValid} = validateExerciseInput(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }

    // Get fields
    const exerciseFields = {};
    exerciseFields.user = req.user.id;
    exerciseFields.name = req.body.name;
    exerciseFields.category = req.body.category;
    exerciseFields.restTime = req.body.restTime;
    exerciseFields.weightIncrement = req.body.weightIncrement;
    exerciseFields.notes = req.body.notes;

    Exercise.findOne(
        {
            user: req.user.id,
            name: req.body.name
        }
    ).then(exercise => {

        if (exercise && !exercise._id.equals(req.body.id)) {
            errors.name = 'That exercise name already exists';
            res.status(400).json(errors);
        } else {
            Exercise.findOne(
                {
                    _id: req.body.id
                }
            ).then(exercise => {
                if (exercise) {
                    // Update a Exercise
                    Exercise.findOneAndUpdate(
                        {
                            _id: req.body.id
                        },
                        {$set: exerciseFields},
                        {new: true}
                    ).then(exercise => res.json(exercise));
                } else {
                    res.status(400).json({msg: 'Exercise update failed.'});
                }
            });
        }
    });
});

// @route   DELETE api/exercise
// @desc    Delete users exercise by name
// @access  Private
router.delete('/:id', passport.authenticate('jwt', {session: false}), (req, res) => {

        Exercise.findOneAndRemove(
            {
                _id: req.params.id
            },
            function (err, exercise) {
                if (err) {
                    return res.status(404).json(err);
                }
                return res.status(200).json(exercise);
            })
    }
);
module.exports = router;
