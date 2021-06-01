
const {
    ResourceNotFound, InvalidCredentials, AlreadyExists,
} = require('../exceptions/exception');
const { getToken } = require('../config/jwt-configuration');
const UserSchema = require('../models/userModel');
const GameSchema = require('../models/gameModel');


module.exports.findById = async (req, res, next) => {
    try {
        let { params: { _id } } = req;

        let user = await UserSchema.findOne({ _id }).select('-password -salt -__v');

        if (!user || !user.status) { throw new ResourceNotFound("Usuário não encontrado"); }
        
        res.status(200).json(user);

    } catch (error) {
        next(error);
    }
};

module.exports.findAll = async (req, res, next) => {
    try {
        const { query: { page, size } } = req;

        const users = await UserSchema.find({ status: true })
        .skip((page || 0) * (size || 10)).lean()
        .select('_id email');

        res.status(200).json(users);
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
            }, { new: true, select: 'token'});

            res.status(200).json(user);
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

        user.save();
        
        res.status(200).json({
            message: "Usuário cadastrado com sucesso.",
            _id: user._id
        });

    } catch (error) {
        next(error);
    }
};

module.exports.alterPassword = async (req, res, next) => {
    try {
        const { body: { _id, newPassword } } = req;

        let user = await UserSchema.findOne({ _id: _id }).select('name status');

        if (!user || !user.status) { throw new ResourceNotFound("Usuário não encontrado."); }

        user.password = newPassword;

        res.status(200).json("Senha Atualizada com sucesso.")

    } catch (error) {
        next(error);
    }
};

module.exports.alterSettings = async (req, res, next) => {
    try {

        const { body: { _id, settings } } = req;

        let user = await UserSchema.findOne({ _id: _id });

        if (!user || !user.status) { throw new ResourceNotFound("Usuário não encontrado."); }

        user.settings = settings;

        user.save();

        res.status(200).json("Configurações atualizadas com sucesso.")
    } catch (error) {
        next(error);
    }
};

module.exports.alterEmail = async (req, res, next) => {
    try {
        const { body: { _id, newEmail } } = req;

        const user = await UserSchema.findOne({ _id: _id });

if (!user || !user.status) { throw new ResourceNotFound("Usuário não encontrado."); }

        user.email = newEmail;

        user.save();

        res.status(200).json("E-mail atualizado com sucesso.")

    } catch (error) {
        next(error);
    }
};

module.exports.addWishList = async (req, res, next) => {
    try {
        const { body: { user_id, game_id } } = req;

        const user = await UserSchema.findOne({ _id: user_id });
        const game = await GameSchema.findOne({ _id: game_id });

        if (!user || !user.status) { throw new ResourceNotFound("Usuário não encontrado."); }
        if (!game || !game.status) { throw new ResourceNotFound("Jogo não encontrado."); }

        if (user.wishList.indexOf(game_id) == -1) {
            user.wishList.push(game_id);
        }

        user.save();

        res.status(200).json("Jogo adicionado com sucesso a lista de desejos.");

    } catch (error) {
        next(error);
    }
};

module.exports.removeWishList = async (req, res, next) => {
    try {
        const { body: { user_id, game_id } } = req;

        const user = await UserSchema.findOne({ _id: user_id });
        const game = await GameSchema.findOne({ _id: game_id });

        if (!user || !user.status) { throw new ResourceNotFound("Usuário não encontrado."); }
        if (!game || !game.status) { throw new ResourceNotFound("Jogo não encontrado."); }

        user.wishList.splice(user.wishList.indexOf(game_id), 1);

        user.save();

        res.status(200).json("Jogo removido com sucesso da lista de desejos.");

    } catch (error) {
        next(error);
    }
};

module.exports.addGameList = async (req, res, next) => {
    try {
        const { body: { user_id, game_id } } = req;

        const user = await UserSchema.findOne({ _id: user_id });
        const game = await GameSchema.findOne({ _id: game_id });

        if (!user || !user.status) { throw new ResourceNotFound("Usuário não encontrado."); }
        if (!game || !game.status) { throw new ResourceNotFound("Jogo não encontrado."); }

        if (user.gameList.indexOf(game_id) == -1) {
            user.gameList.push(game_id);
        }

        user.save();

        res.status(200).json("Jogo adicionado com sucesso a biblioteca do usuário.");

    } catch (error) {
        next(error);
    }
};

module.exports.removeGameList = async (req, res, next) => {
    try {
        const { body: { user_id, game_id } } = req;

        const user = await UserSchema.findOne({ _id: user_id });
        const game = await GameSchema.findOne({ _id: game_id });

        if (!user || !user.status) { throw new ResourceNotFound("Usuário não encontrado."); }
        if (!game || !game.status) { throw new ResourceNotFound("Jogo não encontrado."); }

        user.gameList.splice(user.gameList.indexOf(game_id), 1);

        user.save();

        res.json("Jogo removido com sucesso da biblioteca do usuário.");

    } catch (error) {
        next(error);
    }
};

module.exports.deactivate = async (req, res, next) => {
    try {
        const { params: { _id } } = req;

        const user = await UserSchema.findOne({ _id: _id });

        if (!user || !user.status) { throw new ResourceNotFound("Usuário não encontrado."); }

        user.status = false;

        user.save();

        res.status(200).json("Usuário desativado com sucesso.");
    } catch (error) {
        next(error);
    }
};