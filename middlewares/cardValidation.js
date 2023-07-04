const { celebrate, Joi } = require('celebrate');

const regex = /^http(:|s:)\/\/.*/;

const createCardValidator = celebrate({
  query: Joi.object().keys({
    owner: Joi.string().id(),
  }),
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    link: Joi.string().pattern(regex),
  }),
});

const deleteCardValidator = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().id(),
  }),
});

const likeCardValidator = celebrate({
  query: Joi.object().keys({
    _id: Joi.string().id(),
  }),
  params: Joi.object().keys({
    cardId: Joi.string().id(),
  }),
});

const dislikeCardValidator = celebrate({
  query: Joi.object().keys({
    _id: Joi.string().id(),
  }),
  params: Joi.object().keys({
    cardId: Joi.string().id(),
  }),
});

module.exports = {
  createCardValidator,
  deleteCardValidator,
  likeCardValidator,
  dislikeCardValidator,
};
