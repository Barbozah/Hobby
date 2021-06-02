const mongoose = require('mongoose');

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
};

module.exports.generate = conn => new Promise((resolve, reject) => {
  
  if (conn && conn.db && conn.db.serverConfig
    && conn.db.serverConfig.isConnected()) resolve(conn);

  mongoose.set('bufferCommands', false);

  mongoose.connection.on('error', errorConnectingToDatabase => reject(errorConnectingToDatabase));

  mongoose.connect(process.env.CONNECTIONSTRING, options).then(() => resolve(mongoose.connection));
});
