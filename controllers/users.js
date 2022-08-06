const User = require('../models/user');
const errorStatus = require('../utils/errorStatus');

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((data) => {
      res.status(errorStatus.SUCCESSFUL_REQUEST).send(data);
    })
    .catch((error) => {
      // if (error.name === 'ValidationError') {
      //   res
      //     .status(errorStatus.BAD_REQUEST)
      //     .send({ message: 'Данные не прошли валидацию на сервере' });
      //   return;
      // }
      res.status(errorStatus.SERVER_ERROR).send({ message: `Ошибка сервера ${error}` });
    });
};
module.exports.getUserById = (req, res) => {
  const userId = req.params.id;
  User.findById(userId)
    .then((data) => {
      if (!data) {
        res
          .status(errorStatus.NOT_FOUND)
          .send({ message: `Пользователь с указанным id:${userId} не найден` });
        return;
      }
      res.status(errorStatus.SUCCESSFUL_REQUEST).send(data);
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        res.status(errorStatus.BAD_REQUEST).send({ message: `Неверно указан id:${userId}` });
        return;
      }
      res.status(errorStatus.SERVER_ERROR).send({ message: `Ошибка сервера ${error}` });
    });
};
module.exports.getUsers = (req, res) => {
  User.find({})
    .then((data) => {
      res.status(errorStatus.SUCCESSFUL_REQUEST).send(data);
    })
    .catch((error) => {
      res.status(errorStatus.SERVER_ERROR).send({ message: `Ошибка сервера ${error}` });
    });
};
module.exports.updateUserInfo = (req, res) => {
  const { name, about } = req.body;
  const userId = req.user._id;
  User.findByIdAndUpdate(userId, { name, about }, { new: true, runValidators: true })
    .then((data) => {
      res.status(errorStatus.SUCCESSFUL_REQUEST).send(data);
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        res.status(errorStatus.BAD_REQUEST).send({ message: 'Некорректные данные' });
      } else {
        res.status(errorStatus.SERVER_ERROR).send({ message: `Ошибка сервера ${error}` });
      }
    });
};
module.exports.updateUserAvatar = (req, res) => {
  const { avatar } = req.body;
  const userId = req.user._id;
  User.findByIdAndUpdate(userId, { avatar }, { new: true, runValidators: true })
    .then((data) => {
      res.status(errorStatus.SUCCESSFUL_REQUEST).send(data);
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        res.status(errorStatus.BAD_REQUEST).send({ message: 'Некорректные данные' });
      } else {
        res.status(errorStatus.SERVER_ERROR).send({ message: `Ошибка сервера ${error}` });
      }
    });
};
