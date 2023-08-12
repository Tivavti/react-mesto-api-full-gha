require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const bodyParser = require('body-parser');
const helmet = require('helmet');
const cookies = require('cookie-parser');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { auth } = require('./middlewares/auth');
const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');
const NotFoundError = require('./utils/errors/notFoundError');
const error = require('./middlewares/err');

const { login, createUser } = require('./controllers/users');
const { loginValidation, createUserValidation } = require('./middlewares/validation');

const { PORT = 3000, DB_URL = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;
const app = express();

app.use(cookies());
app.use(bodyParser.json());

mongoose.connect(DB_URL);
app.use(helmet());
app.disable('x-powered-by');

app.use(cors({ origin: ['https://mesto.irakot.nomoreparties.co', 'http://mesto.irakot.nomoreparties.co', 'http://localhost:3001'], credentials: true }));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(limiter);

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signin', loginValidation, login);
app.post('/signup', createUserValidation, createUser);

app.use(auth);
app.use(userRouter);
app.use(cardRouter);

app.use('/*', (_req, _res, next) => next(new NotFoundError('Страница не найдена')));
app.use(errorLogger);

app.use(errors());
app.use(error);

app.listen(PORT, () => {
  console.log(`Application is running on ${PORT}`);
});
