const router = require("express").Router();
const { createUser, getUserById, getUsers } = require("../controllers/users");

router.post("/users", createUser);
router.get("/users", getUsers);
router.get("/users:id", getUserById);

module.exports = router;
