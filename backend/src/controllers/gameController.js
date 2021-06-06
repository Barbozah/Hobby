
const {
    ResourceNotFound, InvalidCredentials, AlreadyExists,
} = require('../exceptions/exception');

const GameSchema = require('../models/gameModel');

module.exports.findById = async (req, res, next) => {
    try {
        let { params: { _id } } = req;

        const game = await GameSchema.findOne({ _id }).select('-__v');

        if (!game || !game.status) { throw new ResourceNotFound("Jogo não encontrado."); }

        res.status(200).json(game);

    } catch (error) {
        next(error);
    }
};

module.exports.findAllGamesByGenre = async (req, res, next) => {
    try {
        const { body: { genres, page, size } } = req;

        const games = await GameSchema.find({ 'genres': { $in: genres } })
            .select('-__v')
            .skip((page || 0) * (size || 10))
            .lean();

        if (games == []) { throw new ResourceNotFound("Nenhum jogo encontrado."); }

        res.status(200).json(games);

    } catch (error) {
        next(error);
    }
};



module.exports.findAll = async (req, res, next) => {
    try {
        const { body: { page, size } } = req;

        const games = await GameSchema.find({ status: true })
            .select('_id')
            .skip((page || 0) * (size || 10))
            .lean();

        if (!games) { throw new ResourceNotFound("Nenhum jogo encontrado."); }

        res.status(200).json(games);

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

        game = await game.save();

        res.status(200).json({
            message: "jogo cadastrado com sucesso.",
            _id: game._id
        });

    } catch (error) {
        next(error);
    }
};

module.exports.update = async (req, res, next) => {
    try {
        const { body: { _id } } = req;
        const { body } = req;

        let game = await GameSchema.findOne({ _id: _id });

        if (!game || !game.status) { throw new ResourceNotFound("Jogo não encontrado."); }

        for (let field in body) {
            game[field] = body[field];
        }

        await game.save();

        res.status(200).json("jogo atualizado com sucesso.");

    } catch (error) {
        next(error);
    }
};

module.exports.deactivate = async (req, res, next) => {
    try {
        const { params: { _id } } = req;

        const game = await GameSchema.findOne({ _id: _id });

        if (!game || !game.status) { throw new ResourceNotFound("Jogo não encontrado."); }

        game.status = false;

        await game.save();

        res.status(200).json("Jogo desativado com sucesso.");

    } catch (error) {
        next(error);
    }
};
