
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

        res.status(200).json(order);

    } catch (error) {
        next(error);
    }
};

module.exports.findAllByUserId = async (req, res, next) => {
    try {
        const { query: { page, size, user_id } } = req;

        const orders = await orderSchema.find({ user_id: user_id })
        .select('-__v')
        .skip((page || 0) * (size || 10))
        .lean();

        if (!orders) { throw new ResourceNotFound("Nenhum pedido encontrado."); }

        res.status(200).json(orders);

    } catch (error) {
        next(error);
    }
};

module.exports.create = async (req, res, next) => {
    try {

        const { body } = req;
        const { body: { user_id, itemList } } = req;

        const user = await UserSchema.findOne({ _id: user_id });
        if (!user || !user.status) { throw new ResourceNotFound("Usuário não encontrado."); }

        for (let i = 0; i < itemList.length; i++) {
            for (let j = 0; j < user.gameList.length; j++) {
                if (itemList[i] == user.gameList[j]) {
                    return res.status(406).end("Não é permitido comprar um jogo que já possui.");
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

        res.status(200).json({
            message: "Pedido cadastrado com sucesso.",
            _id: order._id
        });

    } catch (error) {
        next(error);
    }
};

module.exports.updateStatus = async (req, res, next) => {
    try {
        let { body: { _id, status } } = req;

        let order = await orderSchema.findOne({ _id }).select('status');
        if (!order) { throw new ResourceNotFound("Pedido não encontrado."); }

        for (let index = 0; index < order.status.length; index++) {
            if (order.status[index].name == status) {
                return res.end("Pedido já " + status);
            }
        }

        status = {
            name: status,
            date: Date.now()
        };

        order = await orderSchema.useFindAndModify(
            { _id: _id },
            { $push: { status: status } },
            { new: true, select: '-__v', runValidators: true}
        );

        res.status(200).json(order);

    } catch (error) {
        next(error);
    }
};
