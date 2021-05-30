const express = require('express') // Importando o express
const app = express() // Iniciando uma instancia do express
const port = 3000

app.get('/', (req, res) => {
    // redirect de rotas
    res.redirect('/home') 
})

app.get('/home', (req, res) => {
    //rota
    res.send('Welcome to First Express API') 
})

app.get('/blog/:artigo?', (req, res) => {
    //rota composta
    var artigo = req.params.artigo
    if(artigo)
        res.send(`Blog do Portella - Artigo ${artigo}`) 
    else 
        res.send(`Blog do Portella - Home`) 
})

app.get('/params/:id', (req, res) => {
    // rota com parametros
    const id = req.params.id
    res.send(`O id é ${id}`) 
})

app.get('/params/:id/:nome', (req, res) => {
    // rota com parametros compostos
    const id = req.params.id
    const nome = req.params.nome
    res.send(`O nome é ${nome} e o id é ${id}`) 
})

app.get('/wa?r', (req, res) => {
    // rota com a letra a opcional
    res.send('Você está procurando por Guerra??') 
})

app.get('/wa+r', (req, res) => {
    // rota com + torna a letra a independente de repeticao
    res.send('Você está procurando por Guerraaaas??') 
})

app.get('/voce-e-*-gay', (req, res) => {
    // rota com * que define parte indepedente, contanto que o inicio e fim seja indentico
    res.send('Huum boiola??') 
})

app.get('/pedro-(padilha-)?portella', (req, res) => {
    // rota com (parte)? opcional
    res.send('Pedro Padilha Portella')
})

app.get(/xxx/, function(req, res) {
    // rota que corrensponde a qualquer url com a expressao regular /xxx/
    res.send('/xxx/');
});

app.get(/.*fly$/, function(req, res) {
    //rota que corresponde a butterfly e dragonfly, ou qualquer coisa que termine com fly
    res.send('/.*fly$/');
  });

/*
    Os caracteres ?, +, *, e () são subconjuntos de suas contrapartes em expressões regulares.
    O hífen (-) e o ponto (.) são interpretados literalmente por caminhos 
    baseados em sequências de caracteres. 
*/

/* Query Params */
app.get('/youtube', (req, res) => {
    //rota com query param
    var canal = req.query['canal']

    if(canal) 
        res.send(`Welcome to que channel ${canal}`)
    res.send(`Channel not found`)
})

app.listen(port, () => console.log(`Server Online on http://localhost:${port}`));