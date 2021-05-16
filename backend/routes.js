const express = require('express');
const route = express.Router();

const middlewares = require('./src/middlewares/middleware');
const loginController = require('./src/controllers/loginController');
const tokenController = require('./src/controllers/tokenController');
const {
    findById,
    signIn,
    signUp,
    findAll,
    alterPassword
} = require('./src/controllers/userController');
/* 
const userController = require('./src/controllers/userController');
const loginController = require('./src/controllers/loginController');
*/
route.get('/', findAll);
route.post('/alterPassword', alterPassword);
route.get('/id', findById);
route.post('/signup', signUp);

route.post('/login', middlewares.validateJWT, loginController.register);
route.post('/token', tokenController.generateToken);
module.exports = route;