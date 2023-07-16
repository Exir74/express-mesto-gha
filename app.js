const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const helmet = require('helmet');
const errorHandler = require('./errors/errorHandler');
const routes = require('./routes/index');
const { URL, PORT } = require('./utils/constants');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

mongoose.connect(URL)
  .then(() => console.log(`db connected on ${URL}`))
  .catch((err) => console.log(`Ошибка подключения к БД: ${err.name}`));

app.use(requestLogger);
app.use(routes);

app.use(errorLogger);
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
