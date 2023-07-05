const { celebrate, Joi } = require('celebrate');

const regex = /http(:|s:)\/\/(www|)[\w\S]+[.][\w\S]{2,}(|\/)/i;

const getUserValidator = celebrate({
  params: Joi.object().keys({
    id: Joi.string().hex().length(24).required(),
  }),
});

const updateUserInfoValidation = celebrate({
  query: Joi.object().keys({
    user: Joi.object().keys({
      _id: Joi.string().hex().length(24).required(),
    }),
  }),
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(30).required(),
  }),
});

const updateAvatarValidation = celebrate({
  query: Joi.object().keys({
    user: Joi.object().keys({
      _id: Joi.string().hex().length(24).required(),
    }),
  }),
  body: Joi.object().keys({
    avatar: Joi.string().pattern(regex).required(),

  }),
});

const userValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().min(2).email().required(),
    password: Joi.string().min(5).required(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(regex),
  }),
});

const updateUserValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(30).required(),
  }),
});

module.exports = {
  getUserValidator,
  updateUserInfoValidation,
  userValidator,
  updateUserValidator,
  updateAvatarValidation,
};
