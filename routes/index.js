const router = require('express').Router();

const auth = require('../middlewares/auth');
const userRouter = require('./usersRoutes');
const cardRouter = require('./cardsRoutes');
const signout = require('../middlewares/signout');
const notFoundErrorHandler = require('../errors/notFoundErrorHandler');
const { userValidator } = require('../middlewares/userValidator');
const { login, createUser } = require('../controllers/userControls');

router.post('/signin', userValidator, login);
router.post('/signup', userValidator, createUser);

router.use(auth);

router.use(userRouter);
router.use(cardRouter);
router.use('/signout', signout);
router.use(notFoundErrorHandler);

module.exports = router;
