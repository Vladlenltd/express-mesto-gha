const cardsRouter = require('express').Router();
const {
  createCard,
  getCard,
  deleteCard,
  likeCard,
  disLikeCard,
} = require('../controllers/cards');

cardsRouter.post('/cards', createCard);
cardsRouter.get('/cards', getCard);
cardsRouter.delete('/cards:id', deleteCard);
cardsRouter.put('/cards/:id/likes', likeCard);
cardsRouter.delete('/cards/:id/likes', disLikeCard);
module.exports = cardsRouter;
