module.exports = class Unauthorized extends Error {
  constructor(message) {
    super(message);
    this.name = 'Unauthorized';
    this.message = message || 'Não autorizado';
    this.status = 401;
    this.stack = (new Error()).stack;
  }
};
