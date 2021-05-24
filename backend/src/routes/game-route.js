const {
  findById,
  create,
  findAll,
  update,
  deactivate
} = require('../controllers/gameController');

module.exports = (express) => {
  const router = express.Router();

  router.get('/', findAll);

  router.post('/create', create);

  router.post('/update', update);

  router.get('/:_id', findById);
  
  router.post('/:_id', deactivate); 

  return router;
};
