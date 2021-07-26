const Sequelize = require('sequelize')
const connection = require('../database.js')

const Games = connection.define('games', {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    year: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    price: {
        type: Sequelize.DOUBLE,
        allowNull: false,
    }
});

Games.sync({ force: false });

module.exports = Games;