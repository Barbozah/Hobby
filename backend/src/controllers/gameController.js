
const {
    ResourceNotFound, InvalidCredentials, AlreadyExists,
} = require('../exceptions/exception');

const GameSchema = require('../models/gameModel');

module.exports.findById = async (req, res, next) => {
    try {
        let { params: { _id } } = req;

        const game = await GameSchema.findOne({ _id }).select('-__v');

        if (!game || !game.status) { throw new ResourceNotFound("Jogo não encontrado."); }

        res.json(game);

    } catch (error) {
        next(error);
    }
};

module.exports.findAllGamesByGenre = async (req, res, next) => {
    try {
        const { body: { genres } } = req;
        const select = req.body.select || '';

        const select_query = {};
        
        for(let s of select.split(',')){
            select_query[s.replace('-','')] = s.includes('-') ? 0 : 1;
        }

        let query = GameSchema.find({ status: true });
        
        if(select) query = GameSchema.find({ 'genres': { $in: genres }, status: true }, select_query);
        
        const games = await query.select('-__v');
        
        res.json(games);

    } catch (error) {
        next(error);
    }
};

module.exports.findAllGenres = async (req, res, next) => {
    try {
        const genres = await GameSchema.distinct('genres');
        
        res.json(genres);
    } catch (error) {
        next(error);
    }
}

module.exports.findGameByTitle = async (req, res, next) => {
    try {
        const select = req.query.select || '';
        const title = req.query.title;

        const select_query = {};
        
        for(let s of select.split(',')){
            select_query[s.replace('-','')] = s.includes('-') ? 0 : 1;
        }

        let query = GameSchema.find({ title: {$regex: title}, status: true }).skip(page*size);
        
        if(select) query = GameSchema.find({ title: {$regex: title}, status: true }, select_query);

        const game = await query;

        if (!game) { throw new ResourceNotFound("Jogo não encontrado."); }

        res.json(game);

    } catch (error) {
        next(error);
    }
};

module.exports.findAll = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page || 0);
        const size = parseInt(req.query.size || 0);
        const sort = req.query.sort || '';
        const select = req.query.select || '';

        const sort_query = sort.split(',').map(s=>s.split('_'));

        const select_query = {};
        
        for(let s of select.split(',')){
            select_query[s.replace('-','')] = s.includes('-') ? 0 : 1;
        }

        let query = GameSchema.find({ status: true }).skip(page*size).lean();
        
        if(select) query = GameSchema.find({ status: true }, select_query).skip(page*size).lean();

        if(size) query = query.limit(size);

        if(sort) query = query.sort(sort_query);

        const games = await query;

        if (!games) { throw new ResourceNotFound("Nenhum jogo encontrado."); }

        res.json(games);

    } catch (error) {
        next(error);
    }
};

module.exports.create = async (req, res, next) => {
    try {
        const { body } = req;

        const existingGame = await GameSchema.findOne({ title: body.title });

        if (existingGame) { throw new AlreadyExists("Jogo já cadastrado."); }

        let game = new GameSchema(body);

        game = await game.save();

        res.json({
            message: "jogo cadastrado com sucesso.",
            _id: game._id
        });

    } catch (error) {
        next(error);
    }
};

module.exports.update = async (req, res, next) => {
    try {
        const { body: { _id } } = req;
        const { body } = req;

        let game = await GameSchema.findOne({ _id: _id });

        if (!game || !game.status) { throw new ResourceNotFound("Jogo não encontrado."); }

        for (let field in body) {
            game[field] = body[field];
        }

        await game.save();

        res.json("jogo atualizado com sucesso.");

    } catch (error) {
        next(error);
    }
};

module.exports.deactivate = async (req, res, next) => {
    try {
        const { params: { _id } } = req;

        const game = await GameSchema.findOne({ _id: _id });

        if (!game || !game.status) { throw new ResourceNotFound("Jogo não encontrado."); }

        game.status = false;

        await game.save();

        res.json("Jogo desativado com sucesso.");

    } catch (error) {
        next(error);
    }
};
