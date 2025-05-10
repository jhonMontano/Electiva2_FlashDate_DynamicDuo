const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

class AuthService{
    constructor(authRepository){
        this.authRepository = authRepository;
    }

    async login(email, password){
        const userFound = await this.authRepository.findByEmail(email);
        if(!userFound) {
            throw new Error("User not found");
        }

        const isMatch = await bcrypt.compare(password, userFound.password);
        if(!isMatch){
            throw new Error ("Incorrect password");
        }

        const token = jwt.sign(
            {id: userFound._id, email: userFound.email},
            process.env.JWT_SECRET,
            {expiresIn: "2h"}
        );

        return {
            user: {
                _id: userFound._id, 
                name: userFound.name,
                email: userFound.email,
                location: userFound.location,
            },
            token
        };
    }
}

module.exports = AuthService;