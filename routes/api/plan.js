const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Load validation
const validatePlanInput = require('../../validation/plan');
// Load Plan Model
const Plan = require('../../models/Plan');
// Load User Model
const User = require('../../models/User');

// @route   GET api/plan
// @desc    Get a plan
// @access  Private
router.get('/', passport.authenticate('jwt', {session: false}), (req, res) => {

    const errors = {};

    Plan.findOne({user: req.user.id})
    //.populate('plan', ['name'])
        .then(plan => {
            if (!plan) {
                errors.noplan = 'There is no plan for this user';
                return res.status(404).json(errors);
            }
            res.json(plan);
        })
        .catch(err => res.status(404).json(err));
});

// @route   POST api/plan
// @desc    Create or update a plan
// @access  Private
router.post('/', passport.authenticate('jwt', {session: false}), (req, res) => {

    const {errors, isValid} = validatePlanInput(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }

    // Get fields
    const planFields = {};
    planFields.user = req.user.id;

    planFields.plan_type = req.body.plan_type;

    planFields.monday = !!req.body.monday;
    planFields.tuesday = !!req.body.tuesday;
    planFields.wednesday = !!req.body.wednesday;
    planFields.thursday = !!req.body.thursday;
    planFields.friday = !!req.body.friday;
    planFields.saturday = !!req.body.saturday;
    planFields.sunday = !!req.body.sunday;

    if (req.body.plan_type === 'beginner' || planFields.plan_type === 'fixed') {
        req.body.squat_max_reps = 0;
        req.body.bench_max_reps = 0;
        req.body.overhead_max_reps = 0;
        req.body.deadlift_max_reps = 0;
        req.body.barbell_row_max_reps = 0;
    }

    if (req.body.plan_type === 'beginner') {
        req.body.squat_max_kg = 0;
        req.body.bench_max_kg = 0;
        req.body.overhead_max_kg = 0;
        req.body.deadlift_max_kg = 0;
        req.body.barbell_row_max_kg = 0;
    }
    planFields.squat_max_kg = req.body.squat_max_kg;
    planFields.squat_max_reps = req.body.squat_max_reps;
    planFields.bench_max_kg = req.body.bench_max_kg;
    planFields.bench_max_reps = req.body.bench_max_reps;
    planFields.overhead_max_kg = req.body.overhead_max_kg;
    planFields.overhead_max_reps = req.body.overhead_max_reps;
    planFields.deadlift_max_kg = req.body.deadlift_max_kg;
    planFields.deadlift_max_reps = req.body.deadlift_max_reps;
    planFields.barbell_row_max_kg = req.body.barbell_row_max_kg;
    planFields.barbell_row_max_reps = req.body.barbell_row_max_reps;

    planFields.start_date = req.body.start_date;

    Plan.findOne({user: req.user.id}).then(plan => {
        if (plan) {
            // Update a Plan
            Plan.findOneAndUpdate(
                {user: req.user.id},
                {$set: planFields},
                {new: true}
            ).then(plan => res.json(plan));
        } else {
            // Create new Plan
            new Plan(planFields)
                .save().then(plan => res.json(plan))
                .catch(err => res.status(400).json(err));
        }
    });
});

// @route   DELETE api/plan
// @desc    Delete users plan by handle key
// @access  Private
router.delete('/', passport.authenticate('jwt', {session: false}), (req, res) => {

        // let errors = {};

        Plan.findOneAndRemove({user: req.user.id}, function (err, plan) {
            if (err) {
                return res.status(404).json(err);
            }
            return res.status(200).json(plan);
        })
    }
);

module.exports = router;
