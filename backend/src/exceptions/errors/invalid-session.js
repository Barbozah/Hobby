module.exports = class InvalidSession extends Error {
  constructor(message) {
    super(message);
    this.name = 'InvalidSession';
    this.message = message || 'Sessão inválida';
    this.status = 401;
    this.stack = (new Error()).stack;
  }
};
