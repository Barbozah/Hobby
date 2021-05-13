exports.generateToken = (req,res,next) => {
    /** Necessário logica para validar se o usuário existe no banco */
    const jwt = require('jsonwebtoken');
    const user = req.body.user;
    const expiresIn = process.env.tokenExpiresIn;
    console.log('Gerando token para user: ' + user);
    const token = jwt.sign({ user }, process.env.SECRET, { expiresIn: expiresIn  });
    return res.json(
        {
            access_token: token,
            expiresIn: expiresIn
        }
    );

}