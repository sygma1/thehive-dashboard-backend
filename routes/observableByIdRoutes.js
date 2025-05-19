//routes/observableByIdRoutes.js

const express = require('express');
const { updateObservable, deleteObservable } = require('../controllers/observableController.js');

const router = express.Router();

/**
 * @route   PATCH /api/observables/:observableId
 * @desc    Update an observable by ID
 */
router.patch('/:observableId', updateObservable);

/**
 * @route   DELETE /api/observables/:observableId
 * @desc    Delete an observable by ID
 */
router.delete('/:observableId', deleteObservable);

module.exports = router;