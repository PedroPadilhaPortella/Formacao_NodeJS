const Sequelize = require('sequelize');

const connection = new Sequelize(
    'guidepress',
    'root',
    'root',
    {
        host: 'localhost',
        dialect: 'mysql'
    }
);

module.exports = connection;