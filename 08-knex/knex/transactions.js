const database = require('./database');

// Transactions

async function testTransacao() {
    try {
        await database.transaction(async transaction => {

            await database.where({ preco: 12.89, id: 1 }).select(['id', 'nome']).table("games_knex")

        });
    } catch(err) {
        console.log(err);
    }
}

testTransacao();