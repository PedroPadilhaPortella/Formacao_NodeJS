const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const AppointmentService = require('./services/appointmentService')

const app = express()
const port = 8080


mongoose.connect('mongodb://localhost:27017/agendamento', { useNewUrlParser: true, useUnifiedTopology: true })

app.use(express.static('public'))
app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


// Routes
app.get('/', (req, res) => {
    res.render('index');
})

app.get('/calendar', async (req, res) => {
    const appointments = await AppointmentService.getAll(false);
    res.json(appointments);
})

app.get('/cadastro', (req, res) => {
    res.render('create');
});

app.post('/create', async (req, res) => {
    const data = req.body;
    const status = await AppointmentService
        .create(data.name, data.email, data.cpf, data.description, data.date, data.time);

    if (status)
        res.redirect('/');
    else
        res.render('create');
});

app.get('/event/:id', async (req, res) => {
    const id = req.params.id
    const appointment = await AppointmentService.getById(id);
    res.render('event', { appointment });
})

app.post('/finish', async (req, res) => {
    const id = req.body.id
    await AppointmentService.finish(id);
    res.redirect('/');
})

app.get('/list', async (req, res) => {
    var appointments = await AppointmentService.getAll(true);
    res.render('list', { appointments });
})

app.get('/search', async (req, res) => {
    const query = req.query.search
    console.log(query)
    var appointments = await AppointmentService.search(query);
    res.render('list', { appointments });
});

const pollTime = 1000;
setInterval(async() => {
    await AppointmentService.sendNotification();
}, pollTime);


app.listen(port, () => console.log(`Application running at http://localhost:${port}`))