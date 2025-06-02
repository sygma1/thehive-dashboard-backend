const express = require('express');
const router = express.Router();

const { 
  createNewCase,
  getCasesFromTheHive,
  getSingleCaseFromTheHive,
  getAllStoredTickets,
  getTicket,
  modifyCase,
  removeCase,
  updateAffectedTo,
  changeTicketStatusByAnalyst,
  closeTicketByManager
} = require('../controllers/caseController.js');

// Create new case (TheHive + Mongo)
router.post('/cases', createNewCase);

// Get all cases from TheHive
router.get('/cases/thehive', getCasesFromTheHive);

// Get one case from TheHive by caseId
router.get('/cases/thehive/:caseId', getSingleCaseFromTheHive);

// Get all stored tickets from Mongo
router.get('/cases', getAllStoredTickets);

// Get one stored ticket by ticketId from Mongo
router.get('/cases/ticket/:ticketId', getTicket);

// Update full case (TheHive + Mongo)
router.put('/cases/:caseId', modifyCase);

// Update only the AffectedTo field (TheHive + Mongo)
router.patch('/cases/:caseId/affected-to', updateAffectedTo);

// Update ticket status in Mongo (analyst)
router.patch('/cases/ticket/:ticketId/status', changeTicketStatusByAnalyst);

// Close ticket by manager (TheHive + Mongo)
router.patch('/cases/:caseId/close', closeTicketByManager);

// Delete case in TheHive + Mongo
router.delete('/cases/:caseId', removeCase);

module.exports = router;
