const database = require('./database');

const game = [
    { nome: "Minecraft", preco: 12.89},
    { nome: "League of Legends", preco: 12.89},
    { nome: "Call of Duty Mobile", preco: 0},
    { nome: "God of War", preco: 16.89}
]

database.insert(game).into("games_knex").then(data => {
    console.log(data);
}).catch(err => {
    console.log(err);
});

const estudios = [
    { nome: "Ubisoft", gameId: 1 },
    { nome: "Activision", gameId: 4 },
    { nome: "EA Games", gameId: 2 },
    { nome: "Riot Games", gameId: 3 },
    { nome: "Blizzard", gameId: 4 },
    { nome: "Oco Studio", gameId: 1 }
]

database.insert(estudios).into("estudios").then(data => {
    console.log(data);
}).catch(err => {
    console.log(err);
});