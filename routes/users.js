const usersRouter = require('express').Router();
const {
  createUser,
  getUserById,
  getUsers,
  updateUserInfo,
  updateUserAvatar,
  login, getCurrentUserInfo,
} = require('../controllers/users');

usersRouter.post('/signin', login);
usersRouter.post('/users', createUser);

usersRouter.get('/users', getUsers);
usersRouter.get('/users/:id', getUserById);
usersRouter.get('/users/me', getCurrentUserInfo);
usersRouter.patch('/users/me', updateUserInfo);
usersRouter.patch('/users/me/avatar', updateUserAvatar);

module.exports = usersRouter;
