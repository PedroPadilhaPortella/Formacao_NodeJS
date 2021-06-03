const Sequelize = require('sequelize')

const connection = new Sequelize(
    'guia-perguntas', 
    'root', 
    'root', 
    {
        host: 'localhost',
        dialect: 'mysql'
    }
);

module.exports = connection