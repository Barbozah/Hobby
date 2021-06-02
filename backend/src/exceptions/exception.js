
const Unauthorized = require('./errors/unauthorized');
const InvalidSession = require('./errors/invalid-session');
const InvalidFields = require('./errors/invalid-fields');
const InternalServerError = require('./errors/internal-server-error');
const AlreadyExists = require('./errors/already-exists');
const InvalidCredentials = require('./errors/invalid-credentials');
const ResourceNotFound = require('./errors/resource-not-found');

const getKnownError = (error) => {
  let currentError = error;
  if (!currentError || !currentError.name) { currentError = { name: 'InternalServerError' }; }

  const knownErrors = {
    JsonWebTokenError: new Unauthorized(),
    TokenExpiredError: new InvalidSession(),
    ValidationError: new InvalidFields(error),
    InternalServerError: new InternalServerError(),
    AlreadyExists: new AlreadyExists(currentError.message),
    InvalidCredentials: new InvalidCredentials(error.message),
    ResourceNotFound: new ResourceNotFound(),
    Unauthorized: new Unauthorized(),
    InvalidSession: new InvalidSession(),
    InvalidFields: new InvalidFields(),
  };
  return knownErrors[currentError.name] || error;
};

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
