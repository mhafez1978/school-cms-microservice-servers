// require('dotenv').config();
// const { config } = require('./config');
const Sequelize = require('sequelize');

const db = new Sequelize('userdb', 'dbadmin', '123456789!!!', {
  host: 'localhost',
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    acquire: 3000,
    idle: 1000,
  },
});

module.exports = db;
