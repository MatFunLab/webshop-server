const Sequelize = require('sequelize');
const { dbName, dbPass } = require('../config/db-config');

//name of db, user and pass
const db = new Sequelize('webshop', dbName, dbPass, {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = db;