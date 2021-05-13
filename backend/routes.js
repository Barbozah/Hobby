const express = require('express');
const route = express.Router();

const middlewares = require('./src/middlewares/middleware');
const loginController = require('./src/controllers/loginController');
const tokenController = require('./src/controllers/tokenController');
/* 
const userController = require('./src/controllers/userController');
const loginController = require('./src/controllers/loginController');

route.get('/user', userController.list);
route.post('/user', userController.register);*/
route.post('/login', middlewares.validateJWT , loginController.register); 
route.post('/token', tokenController.generateToken );
module.exports = route;