const { celebrate, Joi } = require('celebrate');

const regex = /http(:|s:)\/\/(www|)[\w\d\S]+/i;

const createCardValidator = celebrate({
  query: Joi.object().keys({
    user: Joi.object().keys({
      _id: Joi.string().hex().length(24).required(),
    }),
  }),
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().pattern(regex).required(),
  }),
});

const deleteCardValidator = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24).required(),
  }),
  query: Joi.object().keys({
    user: Joi.object().keys({
      _id: Joi.string().hex().length(24).required(),
    }),
  }),
});

const likeCardValidator = celebrate({
  query: Joi.object().keys({
    user: Joi.object().keys({
      _id: Joi.string().hex().length(24).required(),
    }),
  }),
  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24).required(),
  }),
});

const dislikeCardValidator = celebrate({
  query: Joi.object().keys({
    _id: Joi.string().hex().length(24).required(),
  }),
  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24).required(),
  }),
});

module.exports = {
  createCardValidator,
  deleteCardValidator,
  likeCardValidator,
  dislikeCardValidator,
};
