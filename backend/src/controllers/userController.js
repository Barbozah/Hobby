const UserSchema = require('../models/UserModel');

exports.findById = async (req, res) => {
    try {
      const { params: { id } } = req;
  
      const user = await UserSchema.findOne({ id });
  
      if (!user) { throw new Error("não encontrado"); }
  
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

