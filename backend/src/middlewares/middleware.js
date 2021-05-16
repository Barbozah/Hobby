require('dotenv').config();

exports.middlewareGlobal = (req, res, next) => {
    res.locals.umaVariaveLocal = 'valor';
    next();
}

exports.checkCsrfError = (err, req, res, next) => {
    if(err && 'EBADCSRFTOKEN' === err.code){
        return res.send("404");
    }
}

exports.csrfMiddleware = (req, res, next) => {
    res.locals.csrfToken = req.csrfToken();
    next();
}

exports.validateJWT = (req,res,next) => {
    const jwt = require('jsonwebtoken');
    const token = req.headers['authorization'];


    if(!token) return res.status(401).end();

    console.log('Verificando JWT para token ' + token);        
    jwt.verify(token, process.env.SECRET, function(err, decoded) {
        if(err){
            console.log(err); 
            return res.status(401).end();
        } 
        
        req.user = decoded;
        next();
    }
    ); 
    
    next();
}