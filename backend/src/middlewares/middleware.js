require('dotenv').config();

exports.middlewareGlobal = (req, res, next) => {
    res.locals.umaVariaveLocal = 'valor';
    next();
}

exports.middlewareGlobal = (req, res, next) => {
    console.log("0000000000000000000000000000000000000000000000")
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