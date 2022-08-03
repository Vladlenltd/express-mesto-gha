const router = require("express").Router();
const {
  createUser,
  getUserById,
  getUsers,
  updateUserInfo,
  updateUserAvatar,
} = require("../controllers/users");

router.post("/users", createUser);
router.get("/users", getUsers);
router.get("/users:id", getUserById);
router.patch("/users/me", updateUserInfo);
router.patch("/users/me/avatar", updateUserAvatar);
