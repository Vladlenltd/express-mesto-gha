const Card = require('../models/card');
const errorStatus = require('../utils/errorStatus');

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => res.status(errorStatus.SUCCESSFUL_REQUEST).send(card))
    .catch((error) => {
      if (error.name === 'ValidationError') {
        res.status(errorStatus.BAD_REQUEST).send({ message: 'Некорректные данные' });
      } else {
        res.status(errorStatus.SERVER_ERROR).send({ message: `Ошибка сервера ${error}` });
      }
    });
};
module.exports.getCard = (req, res) => {
  Card.find({})
    .then((data) => {
      res.status(errorStatus.SUCCESSFUL_REQUEST).send(data);
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        res.status(errorStatus.BAD_REQUEST).send({ message: 'Карточка не найдена' });
        return;
      }
      res.status(errorStatus.SERVER_ERROR).send({ message: `Ошибка сервера ${error}` });
    });
};
module.exports.deleteCard = (req, res) => {
  const cardId = req.params.id;
  Card.findByIdAndRemove(cardId)
    .then((data) => {
      if (!data) {
        res.status(errorStatus.NOT_FOUND).send({ message: `Карточка с указанным id:${cardId} не найдена` });
        return;
      }
      res.status(errorStatus.SUCCESSFUL_REQUEST).send(data);
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        res.status(errorStatus.BAD_REQUEST).send({ message: 'Некорректные данные' });
        return;
      }
      res.status(errorStatus.SERVER_ERROR).send({ message: `Ошибка сервера ${error}` });
    });
};
module.exports.likeCard = (req, res) => {
  const cardId = req.params.id;
  Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((data) => {
      if (!data) {
        res.status(errorStatus.NOT_FOUND).send({ message: `Карточка с указанным id:${cardId} не найдена` });
        return;
      }
      res.status(errorStatus.SUCCESSFUL_REQUEST).send(data);
    })
    .catch((error) => {
      res.status(errorStatus.BAD_REQUEST).send({ message: `Ошибка сервера ${error}` });
    });
};
module.exports.disLikeCard = (req, res) => {
  const cardId = req.params.id;
  Card.findByIdAndUpdate(
    cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((data) => {
      if (!data) {
        res.status(errorStatus.NOT_FOUND).send({ message: `Карточка с указанным id:${cardId} не найдена` });
        return;
      }
      res.status(errorStatus.SUCCESSFUL_REQUEST).send(data);
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        res.status(errorStatus.BAD_REQUEST).send({ message: 'Некорректные данные' });
        return;
      }
      res.status(errorStatus.SERVER_ERROR).send({ message: `Ошибка сервера ${error}` });
    });
};
