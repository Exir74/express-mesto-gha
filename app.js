require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const userRouter = require('./routes/usersRoutes');
const cardRouter = require('./routes/cardsRoutes');
const notFoundErrorHandler = require('./errors/notFoundErrorHandler');
const errorHandler = require('./errors/errorHandler');
const { createUser, login } = require('./controllers/userControls');
const auth = require('./middlewares/auth');

const { PORT = 3000 } = process.env;
const URL = 'mongodb://localhost:27017/mestodb';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(URL)
  .then(() => console.log(`db connected on ${URL}`))
  .catch((err) => console.log(`Ошибка подключения к БД: ${err.name}`));

// app.use((req, res, next) => {
//   req.user = {
//     _id: '64907361dc6b39f3015bd03e',
//   };
//   next();
// });
app.use(cookieParser());
app.get('/test', (req, res) => {
  res.send(req.user);
});
app.post('/signin', login);
app.post('/signup', createUser);
app.use(auth);
app.use(userRouter);
app.use(cardRouter);
app.use(notFoundErrorHandler);

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
