//routes/caseRoutes.js

const express = require('express');
const router = express.Router();
const { 
  createNewCase, 
  getCases, 
  modifyCase, 
  removeCase 
} = require('../controllers/caseController.js');

router.post('/', createNewCase);
router.get('/', getCases);
router.patch('/:caseId', modifyCase);
router.delete('/:caseId', removeCase);

module.exports = router;