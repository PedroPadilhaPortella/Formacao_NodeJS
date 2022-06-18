const express = require('express')
const app = express()
const port = 3000

const http = require('http').createServer(app)
const io = require('socket.io')(http)

app.set('view engine', 'ejs');
app.use(express.static('public'));

// Configurações do Socket.io
io.on('connection', (socket) => {
    socket.on('sendMessage', (data) => {
        console.log(data)
        io.emit('showMessage', data);
    });

    socket.on('disconnect', () => {
        console.log('user disconnected')
    });
})

app.get('/', (req, res) => {
    res.render('index')
    res.sendFile('./views/style.css')
})

http.listen(port, () => console.log(`listening at http://localhost:${port}`))