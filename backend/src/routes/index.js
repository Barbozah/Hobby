const express = require('express');

const router = express.Router();
const userRoutes = require('./user-route');
const gameRoutes = require('./game-route');
const ratingRoutes = require('./rating-route');
const orderRoutes = require('./order-route');

router.get('/online', (req, res) => res.json(new Date()));

router.use('/user', userRoutes(express));
router.use('/game', gameRoutes(express));
router.use('/rating', ratingRoutes(express));
router.use('/order', orderRoutes(express));

module.exports = router;
