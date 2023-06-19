const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRouter = require('./routes/usersRoutes');
const cardRouter = require('./routes/cardsRoutes');

const { PORT = 3000 } = process.env;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(userRouter);

app.use((req, res, next) => {
  req.user = {
    _id: '6490674affe6a1c3ea4d7be0',
  };

  next();
});
app.use(cardRouter);
app.listen(PORT, () => {
  console.log(`Сервер запущен порт: ${PORT}...`);
});
