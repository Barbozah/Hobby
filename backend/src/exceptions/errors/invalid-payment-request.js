module.exports = class InvalidPaymentRequest extends Error {
    constructor(message) {
      super(message);
      this.name = 'InvalidPaymentRequest';
      this.message = message || 'Requisição de pagamento inválida';
      this.status = 400;
      this.stack = (new Error()).stack;
    }
  };
  