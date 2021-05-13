require('dotenv-safe').config();

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

    console.log('Verificando JWT para token ' + token);    

    if(!token) return res.status(401).end();
    
    jwt.verify(token, process.env.SECRET, function(err, decoded) {
        if(err) return res.status(401).end();
        
        req.userId = decoded.id;
        next();
    }
    ); 
    
    next();
}