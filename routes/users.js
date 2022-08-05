const usersRouter = require("express").Router();
const {
  createUser,
  getUserById,
  getUsers,
  updateUserInfo,
  updateUserAvatar,
} = require("../controllers/users");

usersRouter.post("/users", createUser);
usersRouter.get("/users", getUsers);
usersRouter.get("/users:id", getUserById);
usersRouter.patch("/users/me", updateUserInfo);
usersRouter.patch("/users/me/avatar", updateUserAvatar);

module.exports = usersRouter;
