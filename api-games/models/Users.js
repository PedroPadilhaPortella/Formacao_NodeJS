const Sequelize = require('sequelize')
const connection = require('../database.js')

const Users = connection.define('users', {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
    }
});
Users.sync({ force: false });

module.exports = Users;