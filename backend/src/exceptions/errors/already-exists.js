
module.exports = class AlreadyExists extends Error {
  constructor(message) {
    super(message);
    this.name = 'AlreadyExists';
    this.message = message || 'informação já existente';
    this.status = 409;
    this.stack = (new Error()).stack;
  }
};
