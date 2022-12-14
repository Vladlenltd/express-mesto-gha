const jwt = require('jsonwebtoken');
const AuthError = require('../errors/authError');

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Breare ')) {
    throw new AuthError('Необходима авторизация');
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, 'very-very-secret-code');
  } catch (error) {
    throw new AuthError('Необходима авторизация');
  }
  req.user = payload;

  next();
};
