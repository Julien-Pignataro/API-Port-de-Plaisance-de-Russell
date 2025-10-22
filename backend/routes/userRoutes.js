const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  getAllUsers,
  getUserByEmail,
  updateUser,
  deleteUser,
  logoutUser,
} = require('../controllers/userController');

router.post('/', registerUser);
router.post('/login', loginUser);
router.get('/logout', logoutUser);

router.get('/', getAllUsers);
router.get('/:email', getUserByEmail);
router.put('/:email', updateUser);
router.delete('/:email', deleteUser);

module.exports = router;