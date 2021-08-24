const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require("cookie-parser")
const session = require('express-session')
const flash = require('express-flash')
const validator = require('validator')

const app = express()
const port = 3000

/* Configurations */
app.set('view engine', 'ejs');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser("cookies"))

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}))

app.use(flash());


/* Routes */ 
app.get('/', (req, res) => {
    var emailError = req.flash("emailError");
    var nomeError = req.flash("nomeError");
    var pontosError = req.flash("pontosError");

    var email = req.flash("email")
    var nome = req.flash("nome")
    var pontos = req.flash("pontos")

    // emailError = (emailError == undefined || emailError.length == 0)? undefined : emailError
    // nomeError = (nomeError == undefined || nomeError.length == 0)? undefined : nomeError
    // pontosError = (pontosError == undefined || pontosError.length == 0)? undefined : pontosError

    res.render('index', { emailError, nomeError, pontosError, email, nome, pontos });
})

app.post('/form', (req, res) => {
    const { email, nome, pontos } = req.body
    var emailError;
    var nomeError;
    var pontosError;
    
    if(email == undefined || email == '') emailError = "O email não pode ser vazio";
    if(nome == undefined || nome == '') nomeError = "O nome não pode ser vazio";
    if(pontos == undefined || pontos < 20) pontosError = "você não pode ter menos de 20 pontos";

    if(emailError != undefined || nomeError != undefined || pontosError != undefined) {
        req.flash("emailError", emailError)
        req.flash("nomeError", nomeError)
        req.flash("pontosError", pontosError)

        req.flash('email', email)
        req.flash('nome', nome)
        req.flash('pontos', pontos)

        res.redirect('/')
    }    

    res.send({ email, nome, pontos})
});





app.listen(port, console.log(`App Running at http://localhost:${port}`))