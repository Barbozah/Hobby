const { app } = require('./src/app');
const {hobby} = require('./src/middlewares/middleware')

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`);
  hobby()
});
