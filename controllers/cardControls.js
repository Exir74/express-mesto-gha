const Card = require('../models/Card');
const ServerError = require('../errors/ServerError');
const ValidationError = require('../errors/ValidationError');
const NotFoundError = require('../errors/NotFoundError');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    // .catch(() => next(new ServerError('Ошибка сервера')));
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError('Переданы некорректные данные'));
      } else {
        next(new ServerError('Ошибка сервера'));
      }
    });
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError('Переданы некорректные данные'));
      } else {
        next(new ServerError('Ошибка сервера'));
      }
    });
};

// module.exports.deleteCard = (req, res, next) => {
//   Card.findByIdAndRemove(req.params.id)
//     .then((card) => {
//       res.send({ data: card });
//     })
//     .catch(() => next(new NotFoundError('Карточка не найдена')));
// };

module.exports.deleteCard = (req, res, next) => {
  Card.findByIdAndRemove(
    req.params.cardId,
  )
    .then((card) => {
      if (card) {
        res.send(card);
      } else {
        next(new NotFoundError('id не найден'));
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ValidationError('Переданы некорректные данные'));
      } else {
        next(err);
      }
    });
};

module.exports.likeCard = (req, res, next) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
  { new: true },
)

  .then((likes) => {
    if (likes) {
      res.send(likes);
    } else {
      next(new NotFoundError('id не найден'));
    }
  })
  .catch((err) => {
    if (err.name === 'CastError') {
      next(new ValidationError('Переданы некорректные данные'));
    } else {
      next(err);
    }
  });

module.exports.dislikeCard = (req, res, next) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $pull: { likes: req.user._id } }, // убрать _id из массива
  { new: true },
)
  .then((likes) => {
    if (likes) {
      res.send(likes);
    } else {
      next(new NotFoundError('id не найден'));
    }
  })
  .catch((err) => {
    if (err.name === 'CastError') {
      next(new ValidationError('Переданы некорректные данные'));
    } else {
      next(err);
    }
  });
