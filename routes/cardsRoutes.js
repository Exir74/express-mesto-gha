const router = require('express').Router();
const {
  createCard, getCards, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cardControls');
const { createCardValidator, deleteCardValidator, likeCardValidator } = require('../middlewares/cardValidation');

router.get('/cards', getCards);
router.post('/cards', createCardValidator, createCard);
router.delete('/cards/:cardId', deleteCardValidator, deleteCard);
router.put('/cards/:cardId/likes', likeCardValidator, likeCard);
router.delete('/cards/:cardId/likes', deleteCardValidator, dislikeCard);
module.exports = router;
