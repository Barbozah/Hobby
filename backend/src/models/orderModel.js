const mongoose = require('mongoose');
const unique = require('mongoose-unique-validator');

const OrderSchema = new mongoose.Schema({
    user_id: { type: mongoose.Types.ObjectId },
    itemList: [{
        game_id: { type: mongoose.Types.ObjectId },
        price: { type: Number },
        discount: { type: Number },
        _id: false,
    }],
    status: [{
        name: {
            type: String,
            enum: ["waiting", "approved", "canceled"]
        },
        date: { type: Date },
        _id: false,
    }],
    payment: {
        type: String,
        enum: ["credit card"],
    },
    amount: { type: Number },
});

OrderSchema.plugin(unique, { message: '{PATH} já existente' });

OrderSchema.pre('save', function (next) {
    try {

        this.amount = this.itemList.reduce((amount, game) => amount + game.price - game.discount, 0);

        next();
    } catch (e) {
        next(e);
    }
}); 

module.exports = mongoose.models.Order || mongoose.model('Order', OrderSchema);