const Sequelize = require('sequelize')
const connection = require('../database/database')
const Category = require('./Category')

const Article = connection.define('articles', {
    title: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    slug: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    body: {
        type: Sequelize.TEXT,
        allowNull: false,
    }
});

//Relacionamentos
Article.belongsTo(Category);
Category.hasMany(Article);

// Article.sync({ force: false });



module.exports = Article;