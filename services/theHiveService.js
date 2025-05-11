//theHiveService.js

const theHiveClient = require('../config/theHiveConfig');

const { promisify } = require('util');
const dns = require('dns');
const lookup = promisify(dns.lookup);

const createCase = async (caseData) => {
  const payload = {
    title: caseData.title,
    description: caseData.description || "No description provided",
    severity: caseData.severity || 2,
    startDate: caseData.startDate || Math.floor(Date.now() / 1000),
    owner: caseData.owner,
    tlp: caseData.tlp || 2,
    flag: false
  };

  if (payload.tlp < 0 || payload.tlp > 2) {
    throw new Error("TLP must be between 0-2");
  }
  
  const response = await theHiveClient.post('/case', payload);
  return {
    ...response.data,
    id: response.data.caseId, // Return numeric ID for reference
    apiId: response.data.id
  };
};

const getAllCases = async (rangeStart = 0, rangeEnd = 100) => {
  try {
    const response = await theHiveClient.get('/case', {
      headers: {
        'Range': `case=${rangeStart}-${rangeEnd}`,       
        'Content-Type': undefined    
      }
    });

    return response.data.map(c => ({
      caseId: c.id,
      id: c.caseId,
      title: c.title,
      owner: c.owner,
      status: c.status,
      severity: c.severity,
      createdAt: new Date(c.createdAt)
    }));

  } catch (error) {
    console.error('Deep Error Analysis:', {
      fullError: error.toJSON ? error.toJSON() : error,
      timestamp: Date.now()
    });
    throw error;
  }
};

const updateCase = async (caseId, updatedData) => {
  // Use full Elasticsearch ID without ~ prefix
  const response = await theHiveClient.patch(`/case/${caseId}`, updatedData);
  return response.data;
};

const deleteCase = async (caseId) => {
  // Directly use Elasticsearch ID
  await theHiveClient.delete(`/case/${caseId}`);
};

module.exports = { createCase, getAllCases, updateCase, deleteCase };