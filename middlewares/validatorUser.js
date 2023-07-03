const { celebrate, Joi } = require('celebrate');

module.exports = (req, res, next) => {
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().min(2),
      password: Joi.string().required().min(5),
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string(),
    }),
  });
  next();
};
