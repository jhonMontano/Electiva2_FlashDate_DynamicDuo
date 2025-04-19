const IUauthRepository = require("../../domain/repositories/IUauthRepository");
const AuthModel = require("./model/UserModel");

class AuthRepository extends IUauthRepository{
    async findByEmail(email){
        return await AuthModel.findOne({email});
    }
}

module.exports = AuthRepository;