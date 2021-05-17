module.exports = class InternalServerError extends Error {
  constructor(message) {
    super(message);
    this.name = 'InternalServerError';
    this.message = message || 'Erro interno no servidor';
    this.status = 500;
    this.stack = (new Error()).stack;
  }
};
