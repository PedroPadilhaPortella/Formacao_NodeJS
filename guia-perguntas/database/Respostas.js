const Sequelize = require('sequelize')
const connection = require('./database')
const moment = require('moment')

const Respostas = connection.define('respostas', {
    descricao: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    perguntaId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    createdAt: {
        type: Sequelize.DATE,                  
        get() {
            return moment(this.getDataValue('createdAt')).format('DD/MM/YYYY hh:mm');
        }
    },
    updatedAt: {
        type: Sequelize.DATE,
        get() {
            return moment(this.getDataValue('updatedAt')).format('DD/MM/YYYY hh:mm');
        }
    }
});

Respostas.sync({force: false})

module.exports = Respostas;