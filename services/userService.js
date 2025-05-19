//services/userService.js

const theHiveClient = require('../config/theHiveConfig');

const fetchUsers = async () => {
  const res = await theHiveClient.get('/user');
  return res.data;
};

const createNewUser = async (userData) => {
  const res = await theHiveClient.post('/user', userData);
  return res.data;
};

const updateExistingUser = async (userId, updates) => {
  const res = await theHiveClient.patch(`/user/${userId}`, updates);
  return res.data;
};

const removeUser = async (userId) => {
  await theHiveClient.delete(`/user/${userId}`);
};

module.exports = { fetchUsers, createNewUser, updateExistingUser, removeUser };