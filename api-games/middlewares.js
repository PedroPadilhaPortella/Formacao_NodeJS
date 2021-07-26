const jwt = require('jsonwebtoken');
const { JWTSecret } = require('./utils');

function authenticate(req, res, next) {
    const authToken = req.headers['authorization'];

    if(authToken == undefined) res.status(401).json({ message: 'Token não enviado'});

    const bearer = authToken.split(" ")[1];
    
    jwt.verify(bearer, JWTSecret, (err, data) => {
        if(err) res.status(401).json({ message: 'Token Inválido'});

        req.loggedUser = { id: data.id, email: data.email };
        next();
    });
}

module.exports = { authenticate }