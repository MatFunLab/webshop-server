const Sequelize = require('sequelize');

const db = require('../utils/db-util');

const Order = db.define('cart', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    }
});

module.exports = Order;