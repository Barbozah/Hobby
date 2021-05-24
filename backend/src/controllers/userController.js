
const {
    ResourceNotFound, InvalidCredentials, AlreadyExists,
} = require('../exceptions/exception');
const { getToken } = require('../config/jwt-configuration');
const UserSchema = require('../models/userModel');


module.exports.findById = async (req, res, next) => {
    try {
        let { params: { _id } } = req;

        const user = await UserSchema.findOne({ _id });

        if (!user || !user.status) { throw new ResourceNotFound("Usuário não encontrado"); }

        res.json(user);
    } catch (error) {
        next(error);
    }
};

module.exports.findAll = async (req, res, next) => {
    try {
        const { query: { page, size } } = req;

        const users = await UserSchema.find({status: true}).skip((page || 0) * (size || 10)).lean();

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
        const { body: { _id, newPassword} } = req;

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