const { users } = require('../../data/users');

const login = (req, res) => {
    const { email } = req.body;

    const user = users.find(u => u.email === email);
    
    if (!user) {
        return res.status(401).json({ message: "Incorrect credentials" });
    }

    res.status(200).json({ message: "Successful login", user });
};

const register = (req, res) => {
    const { email } = req.body;

    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
        return res.status(400).json({ message: "Email already registered" });
    }

    const newUser = { email };

    users.push(newUser);

    res.status(201).json({ message: "User registered successfully", user: newUser });
};

module.exports = {
    login,
    register
};
