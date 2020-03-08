const Sequelize = require('sequelize');

const db = require('../utils/db-util');

const Category = db.define('category', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING
    } 
});

module.exports = Category;