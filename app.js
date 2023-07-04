const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const userRouter = require('./routes/usersRoutes');
const cardRouter = require('./routes/cardsRoutes');
const notFoundErrorHandler = require('./errors/notFoundErrorHandler');
const errorHandler = require('./errors/errorHandler');
const { login, createUser } = require('./controllers/userControls');
const auth = require('./middlewares/auth');
const { userValidator } = require('./middlewares/validator');

const { PORT = 3000 } = process.env;
const URL = 'mongodb://localhost:27017/mestodb';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

mongoose.connect(URL)
  .then(() => console.log(`db connected on ${URL}`))
  .catch((err) => console.log(`Ошибка подключения к БД: ${err.name}`));

app.post('/signin', userValidator, login);
app.post('/signup', userValidator, createUser);

app.use(auth);
app.use(userRouter);
app.use(cardRouter);
app.use(notFoundErrorHandler);

app.use(errors());
app.use(errorHandler);

const startServer = () => {
  try {
    app.listen(PORT, () => {
      console.log(`Сервер запущен порт: ${PORT}...`);
    });
  } catch (err) {
    console.log(err.name);
  }
};
startServer();
