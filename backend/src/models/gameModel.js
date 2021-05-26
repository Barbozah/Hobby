const mongoose = require('mongoose');
const unique = require('mongoose-unique-validator');
const RatingSchema = require('./ratingModel');

const GameSchema = new mongoose.Schema({
    title: { type: String },
    developer: { type: String },
    publisher: { type: String },
    release: { type: Date },
    genres: { type: [String] },
    description: { type: String },
    requirements: { type: String },
    price: { type: String },
    discount: Number,
    starsAverage: Number,
    status: Boolean,
}, { timestamps: true });
GameSchema.plugin(unique, { message: '{PATH} já existente' });

GameSchema.pre('save', function (next) {
    try {
        this.status = true;
       
        this.starsAverage = 0;

        next();
    } catch (e) {
        next(e);
    }
});

module.exports = mongoose.models.Game || mongoose.model('Game', GameSchema);

