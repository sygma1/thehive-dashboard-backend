//routes/userRoutes.js

const express = require('express');
const router = express.Router();
const {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  setPassword,
  changePassword
} = require('../controllers/userController.js');


router.get('/', getUsers);
router.post('/', createUser);
router.patch('/:userId', updateUser);
router.delete('/:userId', deleteUser);


// Password endpoints
router.post('/:userId/password/set', setPassword);
router.post('/:userId/password/change', changePassword);

module.exports = router;