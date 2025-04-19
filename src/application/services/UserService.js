const UserRepository = require("../../infrastructure/persistence/UserRepository");
const bcrypt = require("bcryptjs");

class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    async registerUser(userData) {
        const hashedPassword = await bcrypt.hash(userData.password, 10);
        userData.password = hashedPassword;
        
        return await this.userRepository.save(userData);
    }

    async getUser(id) {
        return await this.userRepository.findById(id);
    }

    async getAllUsers(){
        return await this.userRepository.findAll();
    }

    async deleteUser(id){
        return await this.userRepository.deleteUser();
    }
}

module.exports = UserService;
