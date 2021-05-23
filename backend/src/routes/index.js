const express = require('express');

const router = express.Router();
const userRoutes = require('./user-route');

router.get('/online', (req, res) => res.json(new Date()));

router.use('/user', userRoutes(express));

module.exports = router;
