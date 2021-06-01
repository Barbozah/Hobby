
const {
    ResourceNotFound, InvalidCredentials, AlreadyExists,
} = require('../exceptions/exception');

const RatingSchema = require('../models/RatingModel');
const GameSchema = require('../models/GameModel');
const UserSchema = require('../models/userModel');

module.exports.findById = async (req, res, next) => {
    try {
        let { params: { _id } } = req;

        const rating = await RatingSchema.findOne({ _id });

        if (!rating) { throw new ResourceNotFound("Avaliação não encontrada."); }

        res.status(200).json(rating);

    } catch (error) {
        next(error);
    }
};

module.exports.findByUserId = async (req, res, next) => {
    try {

        const user_id = req.params._id;

        const rating = await RatingSchema.findOne({ user_id: user_id });

        if (!rating) { throw new ResourceNotFound("Avaliação não encontrada."); }

        res.status(200).json(rating);

    } catch (error) {
        next(error);
    }
};

module.exports.findAllByGameId = async (req, res, next) => {
    try {
        const { query: { page, size, game_id } } = req;

        const ratings = await RatingSchema.find({ game_id: game_id }).skip((page || 0) * (size || 10)).lean();

        if (!ratings) { throw new ResourceNotFound("Nenhuma avaliação encontrada."); }

        res.status(200).json(ratings);

    } catch (error) {
        next(error);
    }
};

module.exports.create = async (req, res, next) => {
    try {
        const { body } = req;
        const { user_id, game_id } = req;

        const user = await UserSchema.findOne({ _id: user_id });
        if (!user || !user.status) { throw new ResourceNotFound("Usuário não encontrado"); }

        const existingGame = await GameSchema.findOne({ _id: game_id });
        if (!existingGame) { throw new ResourceNotFound("Jogo não encontrado."); }

        const existingRating = await RatingSchema.findOne({ user_id: user_id });
        if (existingRating && existingRating.game_id == game_id) { throw new AlreadyExists("Avaliação já publicada."); }

        let rating = new RatingSchema(body);

        rating = await rating.save();

        await updateStarsAverage(game_id);

        res.status(200).json(rating);

    } catch (error) {
        next(error);
    }
};

module.exports.update = async (req, res, next) => {
    try {
        const { body: { _id, comment, stars, game_id } } = req;

        const rating = await RatingSchema.findOneAndUpdate(
            { _id: _id },
            { $set: { comment: comment, stars: stars } },
            { new: true }
        );
        if (!rating) { throw new ResourceNotFound("Avaliação não encontrada."); }

        await updateStarsAverage(game_id);

        res.status(200).json(rating);


    } catch (error) {
        next(error);
    }
};

async function updateStarsAverage(game_id) {
    try {
        const ratingArray = await RatingSchema.find({ game_id: game_id });
        const average = await RatingSchema.calcAverage(ratingArray);

        await GameSchema.findOneAndUpdate(
            { _id: game_id },
            { $set: { starsAverage: average } },
            { new: true, runValidators: true }
        );
    } catch (error) {
        console.log(error)
        return error;
    }

}