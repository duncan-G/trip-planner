const Sequelize = require('sequelize');

const e = process.env;
const databsaseUrl = `postgres://${e.DB_USER}:${e.DB_PASS}@${e.DB_HOST}/${e.DB_NAME}`;


const db = new Sequelize(databsaseUrl, {
  logging: false
});

module.exports = db;
