const {
  findById,
  create,
  findAllByGameId,
  findByUserId,
  update,
} = require('../controllers/ratingController');

module.exports = (express) => {
  const router = express.Router();

  router.get('/', findAllByGameId);

  router.post('/create', create);

  router.post('/update', update);

  router.get('/:_id', findById);

  router.get('/user/:_id', findByUserId);

  return router;
};
