const userFactory = require('../models/UserModel');

exports.list = function (req, res) {
    res.send(req.body);
}

exports.register = async function (req, res) {
    try {
        const user = userFactory(req.body);
        await user.register();
        return res.status(201).send({ user: user });
    } catch (e) {
        console.log(e);
        return res.status(400).send({ error: 'usuário não foi criado'});
    }
}


