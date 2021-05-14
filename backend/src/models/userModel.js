const mongoose = require('mongoose');
const validators = require('mongoose-validators');
const unique = require('mongoose-unique-validator');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        require: [true, '{PATH} é um campo obrigatório'],
        unique: true,
        validate: validators.isEmail({ message: '{VALUE} não é um {PATH} válido' }),
    },
    password: {
        type: String,
        require: [true, '{PATH} é um campo obrigatório'],
    },
    salt: String,
    token: String,
});
UserSchema.plugin(unique, { message: '{PATH} já existente' });
const UserModel = mongoose.model('UserModel', UserSchema);

register = {
    async register() {
        await UserModel.create(this);
    }
}

const userPrototype = { ...register };

function userFactory(body) {
    const user = Object.create(userPrototype);
    user.email = body.email;
    user.password = body.password;
    return user;
}

module.exports = userFactory;
