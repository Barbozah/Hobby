
const {
    ResourceNotFound, InvalidCredentials, AlreadyExists, InvalidPaymentRequest,
} = require('../exceptions/exception');

const orderSchema = require('../models/orderModel');
const GameSchema = require('../models/GameModel');
const UserSchema = require('../models/userModel');
const sgMail = require('@sendgrid/mail');

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

        const orders = await orderSchema.find({ user_id: user_id })
        .select('-__v')
        .skip((page || 0) * (size || 10))
        .lean();

        if (!orders) { throw new ResourceNotFound("Nenhum pedido encontrado."); }

        res.json(orders);

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

        res.json({
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

        res.json(order);

    } catch (error) {
        next(error);
    }
};
module.exports.payment = async(req, res, next) => {

    try {   
        
        let { body: { _id } } = req;

        const order = await orderSchema.findOne({ _id });
        
        if (!order) { throw new ResourceNotFound("Pedido não encontrado."); }
        
        //Validate if last status its waiting
        let lastStatus = order.status[order.status.length - 1].name;
        if(!(lastStatus === 'waiting')){ throw new InvalidPaymentRequest("Pedido com status " + lastStatus)};

        //Valdate if user exists
        const user = await UserSchema.findOne({_id: order.user_id});
        if (!user || !user.status) { throw new ResourceNotFound("Usuário não encontrado."); }
        
        // //Get games name
        let itemList = order.itemList.map( (item) => item.game_id );
        const games = await GameSchema.find({ '_id': { $in: itemList } });

        let gameData = await games.map((game) => ({
            game_id: game.id,
            title: game.title,
            price: game.price,
            discount: game.discount
        }));
        
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        const from = process.env.SENDGRID_SENDER_EMAIL;
        let subject = 'Confirmação de pagamento pedido ' + _id;
        
        //Init body
        let html = '<div>' +
                        '<h1>Prezado aventureiro ' + user.name + '</h1>' + 
                        '<p>Aqui estão os jogos do seu pedido:</p>' +
                + '</div>';

        html += '<table style="width:100%">' + 
                        '<tr style="text-align: left">' +
                            '<th style="border: 1px solid black">Item</th>' + 
                            '<th style="border: 1px solid black">Preço</th>' +
                            '<th style="border: 1px solid black">Desconto</th>' +
                        '</tr>';
                 
        for(let count = 0; count < gameData.length; count++){
            html += '<tr>' +
                        '<td style="border: 1px solid black">' + gameData[count].title + '</td>' +
                        '<td style="border: 1px solid black">' + gameData[count].price + '</td>' +
                        '<td style="border: 1px solid black">' + gameData[count].discount + '</td>' +
                    '</tr>';
        }        
        
        html += '<tr>' +
                        '<th>Valor Total</th>' +
                        '<td><strong>' + order.amount + '</strong></td>' +
                    '</tr>' +
            '</table>';
        //End Body

        const msg = {
            to: user.email,   
            from, 
            subject,
            html
        }

        sgMail
        .send(msg)
        .then(() => {
            console.log('Email enviado com sucesso.')
            res.json({
                message: "Email enviado com sucesso."
            });
        })
        .catch((error) => {
            console.error(error)
            next(error);
        });
    } catch (error) {
        next(error);
    }
}