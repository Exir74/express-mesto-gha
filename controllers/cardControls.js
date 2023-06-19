const cardSchema = require('../models/cardSchema');

module.exports.getCards = (req, res) => {
  cardSchema.find({})
    .then((cards) => res.send({ dat: cards }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  cardSchema.create({ name, link, owner: req.user._id })
    .then((card) => res.send({ data: card }))
    .catch((e) => res.status(500).send({ message: e }));
};

// module.exports.deleteCard = (req, res) => {
//   if(!cardSchema[req.params._id])
// };
