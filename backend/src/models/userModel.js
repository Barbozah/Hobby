const mongoose = require('mongoose');
const validators = require('mongoose-validators');
const unique = require('mongoose-unique-validator');
const crypto = require('crypto');
const SALT = 16;

const UserSchema = new mongoose.Schema({
    id: {
        type: String,
    },
    name: {
        type: String,
        require: [true, '{PATH} é um campo obrigatório'],
    },
    email: {
        type: String,
        require: [true, '{PATH} é um campo obrigatório'],
        unique: true,
        validate: validators.isEmail({ message: '{VALUE} não é um {PATH} válido' }),
    },
    password: {
        type: String,
        require: [true, '{PATH} é um campo obrigatório'],
        validate: validators.isLength({ message: 'A senha deve ter tamanho entre 6 e 8' }, (6, 8)),
    },
    gameList: [String],
    wishList: [String],
    preferences:[String],
    on_off: Boolean,
    salt: String,
    token: String,
}, { timestamps: true });
UserSchema.plugin(unique, { message: '{PATH} já existente' });

UserSchema.pre('save', function (next) {
    try {
        this.id = this._id.toHexString().slice(0, 4);
        this.on_off = true;
        this.salt = crypto.randomBytes(SALT).toString('hex');
        const hash = crypto.pbkdf2Sync(this.password, this.salt, 10000, 32, 'sha512').toString('hex');
        this.password = hash;
        
        next();
    } catch (e) {
        next(e);
    }
});
UserSchema.methods.comparePassword = function (candidatePassword) {
    const hash = crypto.pbkdf2Sync(candidatePassword || '', this.salt, 10000, 512, 'sha512').toString('hex');
    return this.password === hash;
  };

module.exports = mongoose.models.User || mongoose.model('User', UserSchema);

