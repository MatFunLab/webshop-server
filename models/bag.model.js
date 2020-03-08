const Sequelize = require('sequelize');

const db = require('../utils/db-util');

const Bag = db.define('bag', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    completed: {
        type: Sequelize.INTEGER
    } 
});

module.exports = Bag;