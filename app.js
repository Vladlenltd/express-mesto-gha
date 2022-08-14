const express = require('express');
const mongoose = require('mongoose');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const errorStatus = require('./utils/errorStatus');
const { createUser, login } = require('./controllers/users');
const auth = require('./middlewares/auth');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  // useCreateIndex: true,
  // useFindAndModify: false,
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App works at port ${PORT}`);
});
// app.use((req, res, next) => {
//   req.user = {
//     _id: '62ea405344c8069c77d5e06e',
//   };
//   next();
// });

app.post('/signin', login);
app.post('/signup', createUser);
app.use(express.json());
app.use('/', auth, cardsRouter);
app.use('/', auth, usersRouter);

app.use((req, res) => {
  res.status(errorStatus.NOT_FOUND).send({ message: 'Страницы не существует' });
});
