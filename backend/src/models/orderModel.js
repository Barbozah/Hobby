const mongoose = require('mongoose');
const unique = require('mongoose-unique-validator');

const OrderSchema = new mongoose.Schema({
    user_id: { type: mongoose.Types.ObjectId },
    itemList: {
        game_id: { type: [mongoose.Types.ObjectId] },
        price: { type: Number },
        discount: { type: Number },
    },
    status: {
        name: {
            type: String,
            enum: ["waiting", "approved", "canceled"]
        },
        date: { type: String },
    },
    payment: {
        type: String,
        enum: ["credit card"],
    },
    amount: { type: Number },
}, { timestamps: true });

OrderSchema.plugin(unique, { message: '{PATH} já existente' });

OrderSchema.pre('save', function (next) {
    try {

        next();
    } catch (e) {
        next(e);
    }
});
// Um cliente não pode comprar um mesmo jogo 2 vezes, numa mesma compra ou em compras diferentes

module.exports = mongoose.models.Order || mongoose.model('Order', OrderSchema);