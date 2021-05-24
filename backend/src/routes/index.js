const express = require('express');

const router = express.Router();
const userRoutes = require('./user-route');
const gameRoutes = require('./game-route');

router.get('/online', (req, res) => res.json(new Date()));

router.use('/user', userRoutes(express));
router.use('/game', gameRoutes(express));

module.exports = router;
