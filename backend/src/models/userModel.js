const mongoose = require('mongoose');
const validators = require('mongoose-validators');
const unique = require('mongoose-unique-validator');
const crypto = require('crypto');
const SALT = 16;
const { getToken } = require('../config/jwt-configuration');

const SettingsSchema = new mongoose.Schema({
    field1: String,
    field2: String
});

const UserSchema = new mongoose.Schema({
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
    gameList: [mongoose.Types.ObjectId],
    wishList: [mongoose.Types.ObjectId],
    settings: SettingsSchema,
    status: Boolean,
    salt: String,
    lastLogin: Date, 
    token: String,
}, { timestamps: true });
UserSchema.plugin(unique, { message: '{PATH} já existente' });

UserSchema.pre('save', function (next) {
    try {
        this.lastLogin = this.updatedAt;

        this.token = getToken(this);
    
        if (!this.isModified('password')) return next();

        this.status = true;
        this.salt = crypto.randomBytes(SALT).toString('hex');
        const hash = crypto.pbkdf2Sync(this.password, this.salt, 10000, 32, 'sha512').toString('hex');
        this.password = hash;
        
        next();
    } catch (e) {
        next(e);
    }
});
UserSchema.methods.comparePassword = function (candidatePassword) {
    const hash = crypto.pbkdf2Sync(candidatePassword || '', this.salt, 10000, 32, 'sha512').toString('hex');
    return this.password === hash;
  };

module.exports = mongoose.models.User || mongoose.model('User', UserSchema);

