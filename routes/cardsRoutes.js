const router = require('express').Router();
const { createCard, getCards } = require('../controllers/cardControls');

router.get('/cards', getCards);
router.post('/cards', createCard);

module.exports = router;
