const express = require('express');
const route = express.Router();

const middlewares = require('./src/middlewares/middleware');

const {
    findById,
    signIn,
    signUp,
    findAll,
    alterPassword
} = require('./src/controllers/userController');

route.get('/id' ,findById);
route.post('/signup', signUp);
route.post('/signin', signIn);

/**
 * Preencher as variáveis do .env SECRET e tokenExpiresIn
 * Exemplo de autenticação utilizando JWT no middlewware
 * OBS: Não funciona com função assincrona!
 * 
 * Para utilizar o JWT, Acessar a rota signin com o json
 * {
 *   "email": "seuemail",
 *   "password": "suasenha"
 * }
 * 
 * Recuperar o token e colocar na tag Authorization para qualquer rota
 * que utilizar o validador
 * 
 * route.get('/listarJogos', middlewares.validateJWT, controllerListar); 
 */

module.exports = route;