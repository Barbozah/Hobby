require('dotenv').config();

const express = require('express');
const app = express();
const {middlewareGlobal, hobby, checkCsrfError, csrfMiddleware} = require('./src/middlewares/middleware')
const path = require('path');

const flash = require('connect-flash'); // mensagens que se apagam depois de visualizadas, talvez seja útil
const csrf = require('csurf'); 
const helmet = require('helmet'); // para segurança, recomendado pelo Express

// configuração do banco (já online)
const PORT = process.env.PORT || 3000;
const mongoose = require('mongoose');

mongoose.connect(process.env.CONNECTIONSTRING, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
  .then(() => {
    app.emit("mongoDB");
    console.log("mondoDB connected");
  })
  .catch(e => console.log(e));
//mongoose.connection.dropDatabase();


const session = require('express-session'); // sessão de login
const MongoStore = require('connect-mongo')(session); // para guardar a sessão. configuração abaixo
const sessionOptions = session({
  secret: "oiueroifoiwneifn",
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7, // 7 dias em milésimos de segundos
    httpOnly: true
  }
});

app.use(sessionOptions);
app.use(flash());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//app.use(csrf());
app.use(middlewareGlobal);
//app.use(checkCsrfError);
//app.use(csrfMiddleware);

const routes = require('./src/routes/index');
const { configuration } = require('./src/config/jwt-configuration');

app.use('/', configuration.unless({ path: ['/online', '/user/signin', '/user/signup'] }), routes);
app.on("mongoDB", () => {
  app.listen(PORT, function(err){ 
    if (err) 
        console.log(err); 
    console.log("Server listening on PORT", PORT); 
    console.log(`http://localhost:${PORT}/`); 
    hobby()
})
});

const serverError = require('./src/middlewares/server-error');
app.use(serverError);
