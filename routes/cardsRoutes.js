const router = require('express').Router();
const {
  createCard, getCards, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cardControls');

router.get('/cards', getCards);
router.post('/cards', createCard);
router.delete('/cards/:id', deleteCard);
router.put('/cards/:cardId/likes', likeCard);
router.delete('/cards/:cardId/likes', dislikeCard);
module.exports = router;
