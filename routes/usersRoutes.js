const router = require('express').Router();
const {
  getUser, getUsers, createUser, updateUserInfo, updateAvatar, getCurrentUserInfo,
} = require('../controllers/userControls');
const {
  getUserValidator,
  getCurrentUserValidation,
  updateUserValidator,
  updateAvatarValidation,
  userValidator,
} = require('../middlewares/userValidator');

router.get('/users/me', getCurrentUserValidation, getCurrentUserInfo);
router.get('/users', getUsers);
router.get('/users/:id', getUserValidator, getUser);
router.post('/users', userValidator, createUser);
router.patch('/users/me', updateUserValidator, updateUserInfo);
router.patch('/users/me/avatar', updateAvatarValidation, updateAvatar);

module.exports = router;
