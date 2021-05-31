
const {
    ResourceNotFound, InvalidCredentials, AlreadyExists,
} = require('../exceptions/exception');

const orderSchema = require('../models/orderModel');
const GameSchema = require('../models/GameModel');
const UserSchema = require('../models/userModel');

module.exports.findById = async (req, res, next) => {
    try {
        let { params: { _id } } = req;

        const order = await orderSchema.findOne({ _id });

        if (!order) { throw new ResourceNotFound("Pedido não encontrado."); }

        res.json(order);

    } catch (error) {
        next(error);
    }
};

module.exports.findAllByUserId = async (req, res, next) => {
    try {
        const { query: { page, size, user_id } } = req;

        const orderArray = await orderSchema.find({ user_id: user_id }).skip((page || 0) * (size || 10)).lean();

        res.json(orderArray);

    } catch (error) {
        next(error);
    }
};

module.exports.create = async (req, res, next) => {
    try {

        const { body } = req;
        const { body: { user_id, itemList } } = req;

        const user = await UserSchema.findOne({ _id: user_id });
        if (!user || !user.status) { throw new ResourceNotFound("Usuário não encontrado"); }

        for (let i = 0; i < itemList.length; i++) {
            for (let j = 0; j < user.gameList.length; j++) {
                if (itemList[i] == user.gameList[j]) {
                    return res.status(406).end("não pode comprar novamente um jogo que já possui");
                }
            }
        }

        const games = await GameSchema.find({ '_id': { $in: itemList } });

        body.itemList = await games.map((game) => ({
            game_id: game.id,
            price: game.price,
            discount: game.discount
        }));

        let order = new orderSchema(body);

        order.status = {
            name: "waiting",
            date: Date.now()
        };

        order = await order.save();

        res.json(order);

    } catch (error) {
        next(error);
    }
};

module.exports.updateStatus = async (req, res, next) => {
    try {
        let { body: { _id, status } } = req;

        let order = await orderSchema.findOne({ _id });
        if (!order) { throw new ResourceNotFound("Pedido não encontrado."); }

        // Um mesmo status não pode ser adicionado mais que 1 vez
        for (let index = 0; index < order.status.length; index++) {
            if (order.status[index].name == status) {
                return res.json(order);
            }
        }

        status = {
            name: status,
            date: Date.now()
        };

        order = await orderSchema.findOneAndUpdate(
            { _id: _id },
            { $push: { status: status } },
            { new: true }
        );
        if (!order) { throw new ResourceNotFound(); }

        res.json(order);

    } catch (error) {
        next(error);
    }
};
