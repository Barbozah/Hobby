
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

module.exports.search = async (req, res, next) => {
    try {;
        const sort = req.body.sort || '';
        const select = req.body.select || '';
        const query_search = req.body.query || {};
        const page = parseInt(req.body.page || 0);
        const size = parseInt(req.body.size || 0);

        const sort_query = sort.split(',').map(s=>s.split('_'));

        const select_query = {};
        
        for(let s of select.split(',')){
            select_query[s.replace('-','')] = s.includes('-') ? 0 : 1;
        }

        let query = GameSchema.find({ ...query_search, status: true }).skip(page*size).lean();;
        
        if(select) query = GameSchema.find({ ...query_search, status: true }, select_query).skip(page*size).lean();;

        if(sort) query = query.sort(sort_query);

        if(size) query = query.limit(size);

        const games = await query;

        if (!games) { throw new ResourceNotFound("Nenhum jogo encontrado."); }

        res.json(games);

    } catch (error) {
        next(error);
    }
};

module.exports.related = async (req, res, next) => {
    try{
        const { _id, _g, size } = req.body;

        const levenshteinDistance = (str1 = '', str2 = '') => {
            const track = Array(str2.length + 1).fill(null).map(() =>
            Array(str1.length + 1).fill(null));
            for (let i = 0; i <= str1.length; i += 1) {
               track[0][i] = i;
            }
            for (let j = 0; j <= str2.length; j += 1) {
               track[j][0] = j;
            }
            for (let j = 1; j <= str2.length; j += 1) {
               for (let i = 1; i <= str1.length; i += 1) {
                  const indicator = str1[i - 1] === str2[j - 1] ? 0 : 1;
                  track[j][i] = Math.min(
                     track[j][i - 1] + 1,
                     track[j - 1][i] + 1,
                     track[j - 1][i - 1] + indicator,
                  );
               }
            }
            return track[str2.length][str1.length];
        };

        function compareGenres(a, b){

            const l1 = levenshteinDistance(_g,a)

            const l2 = levenshteinDistance(_g,b)

            return l1 - l2;
        }

        GameSchema.find({_id: {$ne: _id}, status: true})
            .select('_g')
            .then(gs => {
                const result = gs.sort((a,b) => compareGenres(a._g, b._g));
                GameSchema.find({_id: {$in: result.slice(0, size).map(r=>r._id)}})
                    .then(o => res.json(o))
            })
            .catch(err => next(err));

    }catch (error) {
        console.log(error);
        next(error);
    }
}

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

module.exports.total = async (req, res, next) => {
    try {

        let {body: { query } } = req;

        const total = await GameSchema.count({...query, status: true});

        res.json(total);

    } catch (error) {
        next(error);
    }
}