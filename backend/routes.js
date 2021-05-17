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


route.get('/findAll', findAll);
route.get('/:id', findById);
route.post('/alterPassword', alterPassword);
route.post('/signin', signIn);
route.post('/signup', signUp);

module.exports = route;