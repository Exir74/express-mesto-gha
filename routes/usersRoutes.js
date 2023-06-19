const router = require('express').Router();
const { getUser, getUsers, createUser } = require('../controllers/userControls');

router.get('/users', getUsers);
router.get('/users/:id', getUser);
router.post('/users', createUser);

module.exports = router;
