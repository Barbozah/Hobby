module.exports = class InvalidCredentials extends Error {
  constructor(message) {
    super(message);
    this.name = 'InvalidCredentials';
    this.message = message || 'Usuário e/ou senha inválidos';
    this.status = 401;
    this.stack = (new Error()).stack;
  }
};
