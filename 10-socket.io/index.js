const express = require('express')
const app = express()
const port = 3000

const http = require('http').createServer(app)
const io = require('socket.io')(http)


app.set('view engine', 'ejs')

io.on('connection', (socket) => {
    socket.on('message', (data) => {
        console.log(data)
        socket.emit('resultado', data)
    })

    socket.on('disconnect', () => {
        console.log('user disconnected')
    })
})

app.get('/', (req, res) => {
  res.render('index')
})

http.listen(port, () => console.log(`listening at http://localhost:${port}`))