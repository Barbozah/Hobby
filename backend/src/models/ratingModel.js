const mongoose = require('mongoose');
const unique = require('mongoose-unique-validator');

const RatingSchema = new mongoose.Schema({
    user_id: { type: mongoose.Types.ObjectId },
    game_id: { type: mongoose.Types.ObjectId },
    comment: { type: String },
    stars: { type: Number },
}, { timestamps: true });

RatingSchema.plugin(unique, { message: '{PATH} já existente' });

RatingSchema.pre('save', function (next) {
    try {

        next();
    } catch (e) {
        next(e);
    }
});

RatingSchema.statics.calcAverage = async function (ratings) {
    try {
        let amount = ratings.reduce(
            (x, y) => x + y.stars
            , 0);
        return amount / ratings.length;
    }catch(e){
        console.log(e);
        return 0;
    }
} 

module.exports = mongoose.models.Rating || mongoose.model('Rating', RatingSchema);

