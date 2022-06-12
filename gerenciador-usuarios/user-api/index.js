var bodyParser = require('body-parser')
var express = require("express")
var cors = require("cors")

var app = express()
var router = require("./routes/routes")
 
// parse application/x-www-form-urlencoded
app.use(cors())

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use('/', router);

const PORT = 8686

app.listen(PORT,() => {
    console.log(`Server running at http://localhost:${PORT}`)
});
