const Sequelize = require('sequelize');

const db = require('../utils/db-util');

const Token = db.define('token', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    uniqueString: {
        type: Sequelize.STRING
    } 
});

module.exports = Token;