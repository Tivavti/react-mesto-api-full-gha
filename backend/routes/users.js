const userRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const { RegexUrl } = require('../utils/regex');

const {
  logout,
  getUsers,
  getCurrentUser,
  updateUser,
  getUser,
  updateAvatar,
} = require('../controllers/users');

userRouter.get('/users', getUsers);

userRouter.get('/users/me', getCurrentUser);

userRouter.get('/users/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().length(24).hex().required(),
  }),
}), getUser);

userRouter.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), updateUser);

userRouter.patch('/users/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().pattern(RegexUrl),
  }),
}), updateAvatar);

userRouter.post('/users/me/logout', logout);

module.exports = userRouter;
