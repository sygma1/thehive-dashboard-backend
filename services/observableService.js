//services/observableService.js

const theHiveClient = require('../config/theHiveConfig');

const createObservable = async (caseId, observableData) => {
  const res = await theHiveClient.post(`/case/${caseId}/artifact`, observableData);
  return res.data;
};

const getObservablesByCaseId = async (caseId) => {
  const body = {
    _parent: {
      _type: 'case',
      _query: {
        _id: caseId
      }
    }
  };
  const res = await theHiveClient.post(`/case/artifact/_search`, body);
  return res.data;
};


const updateObservableById = async (observableId, updates) => {
  const res = await theHiveClient.patch(`case/artifact/${observableId}`, updates);
  return res.data;
};

const deleteObservableById = async (observableId) => {
  await theHiveClient.delete(`case/artifact/${observableId}`);
};

module.exports = { createObservable, getObservablesByCaseId, updateObservableById, deleteObservableById };