const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Load validation
const validateSettingsInput = require('../../validation/settings');
// Load Settings Model
const Settings = require('../../models/Settings');
// Load User Model
const User = require('../../models/User');

// @route   GET api/settings
// @desc    Get settings data
// @access  Private
router.get('/', passport.authenticate('jwt', {session: false}), (req, res) => {

    const errors = {};

    Settings.findOne(
        {
            user: req.user.id,
        }
    )
        .then(settings => {
            if (!settings) {
                errors.nosettings = 'There are no settings for this user';
                return res.status(404).json(errors);
            }
            res.json(settings);
        })
        .catch(err => res.status(404).json(err));
});

// @route   POST api/settings
// @desc    Create or update a settings
// @access  Private
router.post('/', passport.authenticate('jwt', {session: false}), (req, res) => {

    const {errors, isValid} = validateSettingsInput(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }

    // Get fields
    const settingsFields = {};
    settingsFields.user = req.user.id;
    settingsFields.dateFormat = req.body.dateFormat;
    settingsFields.restTime = req.body.restTime;
    settingsFields.weightIncrement = req.body.weightIncrement;

    Settings.findOne(
        {user: req.user.id}
        )
        .then(settings => {
        if (settings) {
            // Update Settings
            Settings.findOneAndUpdate(
                {user: req.user.id},
                {$set: settingsFields},
                {new: true}
            ).then(settings => res.json(settings));
        } else {
            // Create Settings
            new Settings(settingsFields)
                .save().then(settings => res.json(settings))
                .catch(err => res.status(400).json(err));
        }
    });
});

module.exports = router;
