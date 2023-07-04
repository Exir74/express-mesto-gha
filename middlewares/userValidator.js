const { celebrate, Joi } = require('celebrate');

const regex = /^http(:|s:)\/\/.*/;

const getUserValidator = celebrate({
  params: Joi.object().keys({
    id: Joi.string().id(),
  }),
});

const getCurrentUserValidation = celebrate({
  query: Joi.object().keys({
    id: Joi.string().id(),
  }),
});

const updateUserInfoValidation = celebrate({
  query: Joi.object().keys({
    id: Joi.string().id(),
  }),
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
});

const updateAvatarValidation = celebrate({
  query: Joi.object().keys({
    id: Joi.string().id(),
  }),
  body: Joi.object().keys({
    avatar: Joi.string().pattern(regex),

  }),
});

const userValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().min(2).email(),
    password: Joi.string().required().min(5),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(regex),
  }),
});

const updateUserValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
});

module.exports = {
  getUserValidator,
  getCurrentUserValidation,
  updateUserInfoValidation,
  userValidator,
  updateUserValidator,
  updateAvatarValidation,
};
