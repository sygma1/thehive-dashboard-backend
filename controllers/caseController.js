//caseController.js

const { 
    createCase, 
    getAllCases, 
    updateCase, 
    deleteCase 
} = require('../services/theHiveService');
  
const createNewCase = async (req, res) => {
    try {
        if (!req.body.title || !req.body.owner) {
            return res.status(400).json({ error: "Missing title or owner" });
        }
        if (req.body.severity && (req.body.severity < 1 || req.body.severity > 4)) {
            return res.status(400).json({ error: "Severity must be 1-4" });
        }
      
        const newCase = await createCase(req.body);
        res.status(201).json({
          id: newCase.caseId, // Use numeric ID
          apiId: newCase._id,
          title: newCase.title,
          owner: newCase.owner,
          status: newCase.status
        });
    } catch (error) {
      console.error('TheHive API Error (createNewCase):', {
        status: error.response?.status,
        data: error.response?.data,
        request: error.config?.data
      });
      res.status(error.response?.status || 500).json({
        error: error.response?.data?.message || 'Case creation failed'
      });
    }
};
  
const getCases = async (req, res) => {
  try {
    const { rangeStart = 0, rangeEnd = 100 } = req.query;
    const cases = await getAllCases(rangeStart, rangeEnd);

    if (!Array.isArray(cases)) {
      console.warn('getAllCases did not return an array:', cases);
      return res.status(500).json({
        error: 'Unexpected response format from TheHive',
        system: 'Expected array, received non-array'
      });
    }

    const formattedCases = cases.map(c => ({
      displayId: c.caseId,
      apiId: c.id,
      title: c.title,
      owner: c.owner,
      status: c.status,
      severity: c.severity,
      createdAt: c.createdAt
    }));

    res.status(200).json(formattedCases);

  } catch (error) {
    console.error('Complete Error Context:', {
      message: error.message,
      stack: error.stack,
      env: {
        THE_HIVE_URL: process.env.THE_HIVE_URL,
        NODE_ENV: process.env.NODE_ENV
      }
    });

    res.status(500).json({
      error: 'Case retrieval failed',
      system: 'Check TheHive connection and logs'
    });
  }
};
  
const modifyCase = async (req, res) => {
    try {
      if (!req.params.caseId) {
        return res.status(400).json({ error: "Missing caseId parameter" });
      }
  
      const updatedCase = await updateCase(req.params.caseId, req.body);
      res.status(200).json(updatedCase);
    } catch (error) {
      console.error('TheHive API Error (modifyCase):', {
        status: error.response?.status,
        data: error.response?.data,
        request: error.config?.data
      });
      res.status(error.response?.status || 500).json({
        error: error.response?.data?.message || 'Failed to update case'
      });
    }
};
  
const removeCase = async (req, res) => {
    try {
      if (!req.params.caseId) {
        return res.status(400).json({ error: "Missing caseId parameter" });
      }
  
      await deleteCase(req.params.caseId);
      res.status(204).send();
    } catch (error) {
      console.error('TheHive API Error (removeCase):', {
        status: error.response?.status,
        data: error.response?.data,
        request: error.config?.data
      });
      res.status(error.response?.status || 500).json({
        error: error.response?.data?.message || 'Failed to delete case'
      });
    }
};
  
module.exports = { createNewCase, getCases, modifyCase, removeCase };