require('dotenv').config();

exports.middlewareGlobal = (req, res, next) => {
    next();
}

exports.hobby = (req, res, next) => {
  // https://patorjk.com/software/taag/#p=display&f=ANSI%20Shadow&t=Hobby
    console.log(`
    ██╗  ██╗ ██████╗ ██████╗ ██████╗ ██╗   ██╗
    ██║  ██║██╔═══██╗██╔══██╗██╔══██╗╚██╗ ██╔╝
    ███████║██║   ██║██████╔╝██████╔╝ ╚████╔╝ 
    ██╔══██║██║   ██║██╔══██╗██╔══██╗  ╚██╔╝  
    ██║  ██║╚██████╔╝██████╔╝██████╔╝   ██║   
    ╚═╝  ╚═╝ ╚═════╝ ╚═════╝ ╚═════╝    ╚═╝   
                                                   
    `)
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