//services/userService.js

const theHiveClient = require('../config/theHiveConfig');

const fetchUsers = async () => {
  const res = await theHiveClient.post('/user/_search', {});
  return res.data;
};

const createNewUser = async (userData) => {
  const res = await theHiveClient.post('/user', userData);
  return res.data;
};

const updateExistingUser = async (userId, updates) => {
  try {
    const res = await theHiveClient.patch(`/user/${userId}`, updates);
    return res.data;
  } catch (error) {
    console.error('TheHive PATCH error:', error.response?.data || error.message);
    throw error;
  }
};

const removeUser = async (userId) => {
  await theHiveClient.delete(`/user/${userId}`);
};

// Set a new password (used by admin or system)
const setUserPassword = async (userId, newPassword) => {
  const res = await theHiveClient.post(`/user/${userId}/password/set`, {
    password: newPassword
  });
  return res.data;
};

// Change current password (used by the user)
const changeUserPassword = async (userId, oldPassword, newPassword) => {
  const res = await theHiveClient.post(`/user/${userId}/password/change`, {
    currentPassword: oldPassword,
    password: newPassword
  });
  return res.data;
};

module.exports = { 
  fetchUsers, 
  createNewUser, 
  updateExistingUser, 
  removeUser,
  setUserPassword,
  changeUserPassword
};