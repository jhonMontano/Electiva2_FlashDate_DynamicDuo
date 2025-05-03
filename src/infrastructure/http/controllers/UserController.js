const { json } = require("body-parser");

class UserController{
    constructor(userService){
        this.userService = userService;
    }

    async register(req, res) {
        try {
            const userData = req.body;
    
            if (req.file) {
                userData.profilePhoto = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
            }
    
            const user = await this.userService.registerUser(userData);
            res.status(201).json(user);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }    

    async getAll(req, res){
        try {
            const users = await this.userService.getAllUsers();
            res.json(users);
        } catch (error) {
            res. status(500).json({error: error.message});
        }
    }
    
    async getUserById(req, res){
        try {
            const user = await this.userService.getUser(req.params.id);
            if(!user) return res.status(404).json({message: "User not found"});
            res.json(user);
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }

    async deleteUser(req, res){
        try {
            const deletedUser = await this.userService.deleteUser(req.params.id);
            if(!deletedUser) return res.status(404).json({message: "User not found"});
            res.json({message: "User deleted successfully"});
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }
}

module.exports = UserController;