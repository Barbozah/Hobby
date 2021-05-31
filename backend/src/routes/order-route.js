const {
  findAllByUserId,
  create,
  updateStatus,
  findById,
} = require('../controllers/orderController');

module.exports = (express) => {
  const router = express.Router();

  router.get('/findAllByUserId', findAllByUserId);

  router.post('/create', create);

  router.post('/updateStatus', updateStatus);

  router.get('/:_id', findById);

  return router;
};
