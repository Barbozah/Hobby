
const Unauthorized = require('./errors/unauthorized');
const InvalidSession = require('./errors/invalid-session');
const InvalidFields = require('./errors/invalid-fields');
const InternalServerError = require('./errors/internal-server-error');
const AlreadyExists = require('./errors/already-exists');
const InvalidCredentials = require('./errors/invalid-credentials');
const ResourceNotFound = require('./errors/resource-not-found');

const getKnownError = (error) => {

  switch (error.name) {

    case 'UnauthorizedError': error = new Unauthorized()
      break;

    case 'TokenExpiredError': error = new InvalidSession()
      break;

    case 'ValidationError': error = new InvalidFields(error.message)
      break;

    case 'Unauthorized':
    case 'InvalidSession':
    case 'InvalidFields':
    case 'InternalServerError':
    case 'AlreadyExists':
    case 'ResourceNotFound':
    case 'InvalidCredentials':
      break;
    default:
      error = new InternalServerError();
      break;
  }

return error;

}

module.exports = {
  getKnownError,
  Unauthorized,
  InvalidSession,
  InvalidFields,
  InternalServerError,
  AlreadyExists,
  ResourceNotFound,
  InvalidCredentials,
};
