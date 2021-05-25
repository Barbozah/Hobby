
const {
    ResourceNotFound, InvalidCredentials, AlreadyExists,
} = require('../exceptions/exception');
const { getToken } = require('../config/jwt-configuration');
const UserSchema = require('../models/userModel');
const GameSchema = require('../models/gameModel');


module.exports.findById = async (req, res, next) => {
    try {
        let { params: { _id } } = req;

        let user = await UserSchema.findOne({ _id });

        if (!user || !user.status) { throw new ResourceNotFound("Usuário não encontrado"); }

        user = {
            user_id: user.id, 
            user_name: user.name, 
            user_email: user.email, 
            user_settings: user.settings, 
            user_wishList: user.wishList, 
            user_gameList: user.gameList,
            user_status: user.status, 
        }
        res.json(user);
    } catch (error) {
        next(error);
    }
};

module.exports.findAll = async (req, res, next) => {
    try {
        const { query: { page, size } } = req;

        const users = await UserSchema.find({ status: true }).skip((page || 0) * (size || 10)).lean();

        res.json(users);
    } catch (error) {
        next(error);
    }
};

module.exports.signIn = async (req, res, next) => {
    try {
        const { body: { email, password } } = req;

        let user = await UserSchema.findOne({ email });

        if (!user || !user.status) { throw new InvalidCredentials("Email ou senha incorretos."); }

        const isValidPassword = await user.comparePassword(password);

        if (!isValidPassword) { throw new InvalidCredentials("Email ou senha incorretos."); }

        user = await UserSchema.findByIdAndUpdate({ _id: user._id },
            {
                $set: { lastLogin: Date.now(), token: getToken(user) },
            }, { new: true });

        res.json(user);
    } catch (error) {
        next(error);
    }
};

module.exports.signUp = async (req, res, next) => {
    try {
        const { body } = req;

        const existingUser = await UserSchema.findOne({ email: body.email });

        if (existingUser) { throw new AlreadyExists("Email já cadastrado."); }

        let user = new UserSchema(body);

        user = await user.save();
        res.json(user);
    } catch (error) {
        next(error);
    }
};

module.exports.alterPassword = async (req, res, next) => {
    try {
        const { body: { _id, newPassword } } = req;

        const user = await UserSchema.findOne({ _id: _id });

        if (!user || !user.status) { throw new InvalidCredentials(); }

        user.password = newPassword;

        user.save();

        res.json(user);
    } catch (error) {
        next(error);
    }
};

module.exports.alterSettings = async (req, res, next) => {
    try {

        const { body: { _id, settings } } = req;

        const user = await UserSchema.findOne({ _id: _id });

        if (!user || !user.status) { throw new InvalidCredentials(); }

        user.settings = settings;

        user.save();

        res.json(user);
    } catch (error) {
        next(error);
    }
};

module.exports.alterEmail = async (req, res, next) => {
    try {
        const { body: { _id, newEmail } } = req;

        const user = await UserSchema.findOne({ _id: _id });

        if (!user || !user.status) { throw new InvalidCredentials(); }

        user.email = newEmail;

        user.save();

        res.json(user);
    } catch (error) {
        next(error);
    }
};

module.exports.addWishList = async (req, res, next) => {
    try {
        const { body: { user_id, game_id } } = req;

        const user = await UserSchema.findOne({ _id: user_id });
        const game = await GameSchema.findOne({ _id: game_id });

        if (!user || !user.status) { throw new InvalidCredentials(); }
        if (!game || !game.status) { throw new ResourceNotFound(); }

        if (user.wishList.indexOf(game_id) == -1) {
            user.wishList.push(game_id);
        }

        user.save();

        res.json({
            user_id: user.id,
            user_wishlist: user.wishList
        });

    } catch (error) {
        next(error);
    }
};

module.exports.removeWishList = async (req, res, next) => {
    try {
        const { body: { user_id, game_id } } = req;

        const user = await UserSchema.findOne({ _id: user_id });
        const game = await GameSchema.findOne({ _id: game_id });

        if (!user || !user.status) { throw new InvalidCredentials(); }
        if (!game || !game.status) { throw new ResourceNotFound(); }

        user.wishList.splice(user.wishList.indexOf(game_id), 1);

        user.save();

        res.json({
            user_id: user.id,
            user_wishlist: user.wishList
        });

    } catch (error) {
        next(error);
    }
};

module.exports.addGameList = async (req, res, next) => {
    try {
        const { body: { user_id, game_id } } = req;

        const user = await UserSchema.findOne({ _id: user_id });
        const game = await GameSchema.findOne({ _id: game_id });

        if (!user || !user.status) { throw new InvalidCredentials(); }
        if (!game || !game.status) { throw new ResourceNotFound(); }

        if (user.gameList.indexOf(game_id) == -1) {
            user.gameList.push(game_id);
        }

        user.save();

        res.json({
            user_id: user.id,
            user_gamelist: user.gameList
        });

        res.json(user.gameList);
    } catch (error) {
        next(error);
    }
};

module.exports.removeGameList = async (req, res, next) => {
    try {
        const { body: { user_id, game_id } } = req;

        const user = await UserSchema.findOne({ _id: user_id });
        const game = await GameSchema.findOne({ _id: game_id });

        if (!user || !user.status) { throw new InvalidCredentials(); }
        if (!game || !game.status) { throw new ResourceNotFound(); }

        user.gameList.splice(user.gameList.indexOf(game_id), 1);

        user.save();

        res.json({
            user_id: user.id,
            user_gamelist: user.gameList
        });

    } catch (error) {
        next(error);
    }
};

module.exports.deactivate = async (req, res, next) => {
    try {
        const { params: { _id } } = req;

        const user = await UserSchema.findOne({ _id: _id });

        if (!user || !user.status) { throw new InvalidCredentials(); }

        user.status = false;

        user.save();

        res.json(user);
    } catch (error) {
        next(error);
    }
};