const JWT_SECRET = 'acaf7fcbb9f7ae79f029dd7eaea7ea884ed6b547c532cdaf99c5ea09afdb8f2f';
const NOT_FOUND = 404;
const BAD_REQUEST = 400;
const UNAUTHORIZED = 401;
const FORBIDDEN = 403;
const CONFLICT = 409;
const SERVER_ERROR = 500;
const URL = 'mongodb://localhost:27017/mestodb';
const { PORT = 3000 } = process.env;

module.exports = {
  JWT_SECRET,
  NOT_FOUND,
  BAD_REQUEST,
  UNAUTHORIZED,
  FORBIDDEN,
  CONFLICT,
  SERVER_ERROR,
  URL,
  PORT,
};
