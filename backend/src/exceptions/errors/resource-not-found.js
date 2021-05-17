module.exports = class ResourceNotFound extends Error {
  constructor(message) {
    super(message);
    this.name = 'ResourceNotFound';
    this.message = message || 'Não encontrado';
    this.status = 404;
    this.stack = (new Error()).stack;
  }
};
