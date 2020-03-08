const Sequelize = require('sequelize');

const db = require('../utils/db-util');

const Role = db.define('role', {
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

module.exports = Role;