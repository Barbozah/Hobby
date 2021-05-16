const UserSchema = require('../models/UserModel');

exports.findById = async function (req, res) {
    try {

        const { body: { id } } = req;

        const user = await UserSchema.findOne({ id: id });

        if (!user) {
            console.log("não encontrado");
            res.status(404).json("não encontrado");
        }
        res.status(200).json(user);

    } catch (err) {
        console.log(err);
        res.status(404).json(err);
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

exports.alterPassword = async (req, res) => {
    try {
        const { id, newPassword } = req.body;

        let user = await UserSchema.findOne({ id: id });
        if (!user) {
            console.log("não encontrado");
            res.status(404).json("não encontrado");
        }
        user.password = newPassword;
        user = await user.save();
        res.status(200).json(user);
        
    } catch (error) {
        console.log(err);
        res.status(404).json(err);
    }
}