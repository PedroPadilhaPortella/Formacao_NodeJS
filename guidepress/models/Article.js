const Sequelize = require('sequelize')
const connection = require('../database/database')

const Article = connection.define('categories', {
    title: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    slug: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    body: {
        type: Sequelize.te,
        allowNull: false,
    }
});

module.exports = Article;