const express = require('express');
const route = express.Router();

const middleware = require('./src/middlewares/middleware');
const loginRequired = require('./src/middlewares/loginRequired');

const {
    findById,
    signIn,
    signUp,
    findAll,
    alterPassword,
    alterEmail,
    deleteUser,
} = require('./src/controllers/userController');

// remover
route.get('/findAll', loginRequired.loginRequired, findAll);

route.get('/findById', loginRequired.loginRequired, findById);
route.post('/alterPassword', loginRequired.loginRequired, alterPassword);
route.post('/alterEmail', loginRequired.loginRequired, alterEmail);
route.post('/deleteUser', loginRequired.loginRequired, deleteUser);
route.post('/signin', signIn);
route.post('/signup', signUp);

module.exports = route;