
const {
    ResourceNotFound, InvalidCredentials, AlreadyExists,
} = require('../exceptions/exception');

const GameSchema = require('../models/gameModel');
const UserSchema = require('../models/userModel');

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

        for (let field in body) { 
            if(field =! "ratings") game[field] = body[field];
         }

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

module.exports.addRatings = async (req, res, next) => {
    try {
        const game_id = req.body.game_id;
        const ratings = req.body.ratings;
        const user_id = req.body.ratings.user_id;

        const user = await UserSchema.findOne({ _id: user_id });
        let game = await GameSchema.findOne({ _id: game_id });

        if (!user || !user.status) { throw new ResourceNotFound("Usuário não encontrado"); }
        if (!game || !game.status) { throw new ResourceNotFound("Jogo não encontrado"); }

        function searchIndex() {
            for (let index in game.ratings) {
                if (game.ratings[index].user_id == user_id) {
                    return index;
                }
            }
            return false;
        }

        const index = searchIndex();
        if (index) { game.ratings.splice(index, 1); }
        
        game.ratings.push(ratings)
        
        game = await game.save();

        res.json(game);

    } catch (error) {
        next(error);
    }
};