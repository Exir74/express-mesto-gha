const router = require('express').Router();
const {
  getUser, getUsers, createUser, updateUserInfo, updateAvatar,
} = require('../controllers/userControls');

router.get('/users', getUsers);
router.get('/users/:id', getUser);
router.post('/users', createUser);
router.patch('/users/me', updateUserInfo);
router.patch('/users/me/avatar', updateAvatar);

module.exports = router;
