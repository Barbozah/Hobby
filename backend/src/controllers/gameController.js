
const {
    ResourceNotFound, InvalidCredentials, AlreadyExists,
} = require('../exceptions/exception');

const GameSchema = require('../models/gameModel');

module.exports.findById = async (req, res, next) => {
    try {
        let { params: { _id } } = req;

        const game = await GameSchema.findOne({ _id });

        if (!game || !game.status) { throw new ResourceNotFound(); }

        res.json(game);

    } catch (error) {
        next(error);
    }
};

module.exports.findAll = async (req, res, next) => {
    try {
        const { query: { page, size } } = req;

        const games = await GameSchema.find({ status: true }).skip((page || 0) * (size || 10)).lean();

        res.json(games);

    } catch (error) {
        next(error);
    }
};

module.exports.create = async (req, res, next) => {
    try {
        const { body } = req;

        const existingGame = await GameSchema.findOne({ title: body.title });

        if (existingGame) { throw new AlreadyExists("Jogo já cadastrado."); }

        let game = new GameSchema(body);

        console.log("game", game);

        game = await game.save();

        res.json(game);

    } catch (error) {
        next(error);
    }
};

module.exports.update = async (req, res, next) => {
    try {
        const { body: { _id } } = req;
        const { body } = req;

        let game = await GameSchema.findOne({ _id: _id });

        if (!game || !game.status) { throw new ResourceNotFound(); }

        for (let field in body) { game[field] = body[field]; }

        game.save();

        res.json(game);

    } catch (error) {
        next(error);
    }
};

module.exports.deactivate = async (req, res, next) => {
    try {
        const { params: { _id } } = req;

        const game = await GameSchema.findOne({ _id: _id });

        if (!game || !game.status) { throw new ResourceNotFound(); }

        game.status = false;

        game.save();

        res.json(game);

    } catch (error) {
        next(error);
    }
};

module.exports.rating = async (req, res, next) => {
    try {
        const { body } = req;

        const existingGame = await GameSchema.findOne({ title: body.title });
        if (existingUser) { throw new AlreadyExists("Email já cadastrado."); }
        
        if (!user || !user.status) { throw new ResourceNotFound("Usuário não encontrado"); }
        if (!game || !game.status) { throw new ResourceNotFound(); }

        let game = new GameSchema(body);

        console.log("game", game);

        game = await game.save();

        res.json(game);

    } catch (error) {
        next(error);
    }
};