const {
  findById,
  findGameByTitle,
  findAllGamesByGenre,
  findAllGenres,
  search,
  create,
  findAll,
  update,
  deactivate,
} = require('../controllers/gameController');

module.exports = (express) => {
  const router = express.Router();

  router.get('/', findAll);

  router.get('/findGameByTitle', findGameByTitle);

  router.get('/findAllGamesByGenre', findAllGamesByGenre);

  router.get('/findAllGenres', findAllGenres);

  router.post('/search', search);

  router.post('/create', create);

  router.post('/update', update);

  router.get('/:_id', findById);

  router.post('/:_id', deactivate);

  return router;
};
