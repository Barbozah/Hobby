const {
  findById,
  signIn,
  signUp,
  findAll,
  alterPassword,
  alterSettings,
  deactivate,
  alterEmail,
  addWishList,
  removeWishList,
  addGameList,
  removeGameList,
} = require('../controllers/userController');

module.exports = (express) => {
  const router = express.Router();

  router.get('/', findAll);

  router.post('/signin', signIn);

  router.post('/signup', signUp);

  router.post('/alterPassword', alterPassword);

  router.post('/alterEmail', alterEmail);

  router.post('/alterSettings', alterSettings);

  router.post('/addWishList', addWishList);

  router.post('/removeWishList', removeWishList);

  router.post('/addGameList', addGameList);

  router.post('/removeGameList', removeGameList);

  router.get('/:_id', findById);

  router.post('/:_id', deactivate);

  return router;
};
