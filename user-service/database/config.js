require('dotenv').config();

const host = process.env.HOST;
const user = process.env.USER;
const password = process.env.PASS;
const name = process.env.NAME;
const dialect = process.env.DIALECT;
const max = process.env.M;
const min = process.env.N;
const acquire = process.env.ACQUIRE;
const idle = process.env.IDLE;

const config = {
  host: host,
  user: user,
  password: password,
  name: name,
  dialect: dialect,
  pool: {
    max: max,
    min: min,
    acquire: acquire,
    idle: idle,
  },
};

module.exports = config;
