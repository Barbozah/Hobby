module.exports = {
    async register(req, res, next){
       return res.json({
           message: "Logado com sucesso"
       })
    }
}