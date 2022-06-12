var jwt = require("jsonwebtoken");
const secret = 'jwtUserAPISecret'

module.exports = function(req, res, next){
    const authToken = req.headers['authorization']

    if(authToken == undefined){
        return res.status(403).send("Você não está autenticado")
    }

    const token = authToken.split(' ')[1];

    try{
        var decoded = jwt.verify(token, secret);
        
        if(decoded.role == 1){
            next();
        }else{
            return res.status(403).send("Você não tem permissão para isso!");
        }
    }catch(err){
        return res.status(403).send("Erro, Você não está autenticado")
    }
}