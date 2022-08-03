const router = require("express").Router();
const { createCard, getCard, deleteCard } = require("../controllers/cards");

router.post("/cards", createCard);
router.get("/cards", getCard);
router.delete("/cards:id", deleteCard);
module.exports = router;
