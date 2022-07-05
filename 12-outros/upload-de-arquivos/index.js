const express = require("express")
const multer = require('multer');
const path = require('path')

const port = 3000;
const app = express()

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => cb(null, file.originalname + Date.now() + path.extname(file.originalname))
});

const uploader = multer({storage});

app.set('view engine', 'ejs')


app.get('/', (req, res) => {
    res.render('index');
});

app.post('/upload', uploader.single('file'), (req, res) => {
    res.send('upload de arquivos');
});

app.listen(port, () => console.log(`Running at http://localhost:${port}`))

