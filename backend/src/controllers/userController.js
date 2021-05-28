const UserSchema = require('../models/UserModel');
require('dotenv').config();

exports.findById = async function (req, res) {
    try {

        const user = await UserSchema.findOne({id: req.body.id});

        if (!user) { console.log("não encontrado"); }

        res.json(user);
    } catch (err) {
        console.log(err);
        res.json(err);
    }
};

exports.signUp = async function (req, res) {
    try {
        let user = new UserSchema(req.body);
        user = await user.save();
        return res.status(201).json(user);
    } catch (err) {
        console.log("Usuário não cadastrado");
        if (err.name == 'ValidationError') {
            for (field in err.errors) {
                console.log(err.errors[field].message);
                return res.status(400).json({ error: err.errors[field].message });
            }
        } else {
            console.log(err);
            return res.status(400).json({ error: err.message });
        }
    }
}

exports.signIn = async function (req, res) {

    const email = req.body.email;

    const user = await UserSchema.findOne({email: email }, 
        function(err,user){
            if(err) throw err;

            if (!user || !user.comparePassword(req.body.password)) {
                return res.status(401).json({ message: 'Email ou Senha inválidos' });
              }

              const jwt = require('jsonwebtoken');
              const expiresIn = process.env.tokenExpiresIn;
              user.password = undefined;

              const token = jwt.sign({ email }, process.env.SECRET, { expiresIn: 300  });
              return res.status(201).json(
                  {
                      access_token: token,
                      expiresIn: expiresIn,
                      user
                  }
              );
        });
}

