const mongoose = require('mongoose');
const unique = require('mongoose-unique-validator');

const GameSchema = new mongoose.Schema({
    title: String,
    mainImage: String,
    extraImages: [String],
    developers: [String],
    publisher: String,
    release: String,
    genres: [String],
    description: String,
    requirements: Object,
    price: Number,
    discount: Number,
    starsAverage: Number,
    reviewInfo: String,
    downloads: [Object],
    status: Boolean,
    _g: String
}, { timestamps: true });
GameSchema.plugin(unique, { message: '{PATH} já existente' });

GameSchema.pre('save', function (next) {
    try {
        this.status = true;
       
        this.starsAverage = this.starsAverage || 0;

        this.reviewInfo = ''
        next();
    } catch (e) {
        next(e);
    }
});

module.exports = mongoose.models.Game || mongoose.model('Game', GameSchema);

