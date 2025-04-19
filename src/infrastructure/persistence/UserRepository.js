const IUserRepository = require("../../domain/repositories/IUserRepoitory");
const UserModel = require("./model/UserModel");

class UserRepository extends IUserRepository{
    async save(user){
        console.log("Saving user to MongoDB", user);
        const newUser = new UserModel(user);
        return await newUser.save();
    }

    async findAll(){
        console.log("Searching users")
        return await UserModel.find();
    }

    async findById(id){
        console.log("Searching user with id: ", id);
        return await UserModel.findById(id);
    }

    async deleteUser(id){
        console.log("Deleting user with id: ", id);
        return await UserModel.deleteOne(id);
    }
}

module.exports = UserRepository;