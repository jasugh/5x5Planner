const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Load validation
const validateCategoryInput = require('../../validation/category');
// Load Category Model
const Category = require('../../models/Category');
// Load User Model
const User = require('../../models/User');

// @route   GET api/category
// @desc    Get a category
// @access  Private
router.get('/', passport.authenticate('jwt', {session: false}), (req, res) => {

    const errors = {};

    Category.findOne(
        {
            user: req.user.id,
            name: req.body.name
        }
    )
        .then(category => {
            if (!category) {
                errors.nocategory = 'There is no exercise categories for this user';
                return res.status(404).json(errors);
            }
            res.json(category);
        })
        .catch(err => res.status(404).json(err));
});

// @route   GET api/category/all
// @desc    Get all categories
// @access  Private
router.get('/all', passport.authenticate('jwt', {session: false}), (req, res) => {

    const errors = {};

    Category.find(
        {
            user: req.user.id,
        }
    )
        .then(categories => {
            if (!categories) {
                errors.nocategory = 'There is no exercise categories for this user';
                return res.status(404).json(errors);
            }
            res.json(categories);
        })
        .catch(err => res.status(404).json(err));
});


// @route   POST api/category/add
// @desc    Create new a category
// @access  Private
router.post('/add', passport.authenticate('jwt', {session: false}), (req, res) => {

    const {errors, isValid} = validateCategoryInput(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }

    // Get fields
    const categoryFields = {};
    categoryFields.user = req.user.id;
    categoryFields.name = req.body.name;

    Category.findOne(
        {
            user: req.user.id,
            name: req.body.name
        }
    ).then(category => {
        if (category) {
            errors.name = 'That category already exists';
            res.status(400).json(errors);
        } else {
            // Create new category
            new Category(categoryFields)
                .save().then(category => res.json(category))
                .catch(err => res.status(400).json(err));
        }
    });
});

// @route   POST api/category/update
// @desc    Update a category
// @access  Private
router.post('/update', passport.authenticate('jwt', {session: false}), (req, res) => {

    const {errors, isValid} = validateCategoryInput(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }

    // Get fields
    const categoryFields = {};
    categoryFields.user = req.user.id;
    categoryFields.name = req.body.name;


    Category.findOne(
        {
            user: req.user.id,
            name: req.body.name
        }
    ).then(category => {

        if (category && !category._id.equals(req.body.id)) {
            errors.name = 'That category name already exists';
            res.status(400).json(errors);
        } else {
            Category.findOne(
                {
                    _id: req.body.id
                }
            ).then(category => {
                if (category) {
                    // Update a Category
                    Category.findOneAndUpdate(
                        {
                            _id: req.body.id
                        },
                        {$set: categoryFields},
                        {new: true}
                    ).then(category => res.json(category));
                } else {
                    res.status(400).json({msg: 'Category update failed.'});
                }
            });
        }
    });

});


// @route   DELETE api/category
// @desc    Delete users category by category name
// @access  Private
router.delete('/:id', passport.authenticate('jwt', {session: false}), (req, res) => {

        Category.findOneAndRemove(
            {
                _id: req.params.id
            },
            function (err, category) {
                if (err) {
                    return res.status(404).json(err);
                }
                return res.status(200).json(category);
            })
    }
);

module.exports = router;
