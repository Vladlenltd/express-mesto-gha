const router = require("express").Router();
const {
  createCard,
  getCard,
  deleteCard,
  likeCard,
  disLikeCard,
} = require("../controllers/cards");

router.post("/cards", createCard);
router.get("/cards", getCard);
router.delete("/cards:id", deleteCard);
router.put("/cards/:id/likes", likeCard);
router.delete("/cards/:id/likes", disLikeCard);
module.exports = router;
