const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRouter = require('./routes/usersRoutes');
const cardRouter = require('./routes/cardsRoutes');

const { PORT = 3000 } = process.env;
const URL = 'mongodb://localhost:27017/mestodb';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(URL)
  .then(() => console.log(`db connected on ${URL}`))
  .catch((err) => console.log(`Ошибка подключения к БД: ${err.name}`));
// };
app.use((req, res, next) => {
  req.user = {
    _id: '64907361dc6b39f3015bd02e',
  };
  next();
});
app.use(userRouter);
app.use(cardRouter);
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  res.status(err.statusCode).send({ message: err.message });
});
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
