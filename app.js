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

// const dbConnect = () => {
mongoose.connect(URL)
  .then(() => console.log(`db connected on ${URL}`))
  .catch((err) => console.log(`Ошибка подключения к БД: ${err.name}`));
// };
// dbConnect();
app.use((req, res, next) => {
  req.user = {
    _id: '64907361dc6b39f3015bd02e',
  };
  next();
});
app.use(userRouter);
app.use(cardRouter);

// app.listen(PORT, () => {
//   console.log(`Сервер запущен порт: ${PORT}...`);
// });
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
