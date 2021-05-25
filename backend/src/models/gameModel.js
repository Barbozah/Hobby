const mongoose = require('mongoose');
const unique = require('mongoose-unique-validator');

const RatingSchema = new mongoose.Schema({
    user_id: { type: mongoose.Types.ObjectId },
    comment: { type: String },
    stars: { type: Number },
}, { timestamps: true });

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
    ratings: { type: [RatingSchema] },
    status: Boolean,
}, { timestamps: true });
GameSchema.plugin(unique, { message: '{PATH} já existente' });

GameSchema.pre('save', function (next) {
    try {
        this.status = true;
       
        this.starsAverage = this.calcAverage();

        next();
    } catch (e) {
        next(e);
    }
});

GameSchema.methods.calcAverage = function(){
    let amount = this.ratings.reduce(
        (x, y) => x + y.stars
    ,0);
    return amount/this.ratings.length;
}

module.exports = mongoose.models.Game || mongoose.model('Game', GameSchema);

