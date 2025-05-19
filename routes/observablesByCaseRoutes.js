//routes/observablesByCaseRoutes.js

const express = require('express');
const { addObservable, fetchObservables } = require('../controllers/observableController.js');

const router = express.Router();

/**
 * @route   GET /api/cases/:caseId/observables
 * @desc    Get all observables for a specific case
 */
router.get('/', fetchObservables);

/**
 * @route   POST /api/cases/:caseId/observables
 * @desc    Add a new observable to a case
 */
router.post('/', addObservable);

module.exports = router;