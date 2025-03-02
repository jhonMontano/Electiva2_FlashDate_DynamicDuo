const {users} = require('../../data/users');

const getUsers = (req, res) => {
    res.status(200).json(users);
}

const getUserByEmail = (req, res) => {
    const { email } = req.params;

    const user = users.find(user => user.email === email);

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(user);
};

const postUsers = (req, res) => {
    console.log("Body recibido:",  req.body);
    res.status(201).json({message: "Created user", data: req.body});
}

const updateUser = (req, res) => {
    const { email } = req.params;
    const { name, newEmail } = req.body;

    const userIndex = users.findIndex(user => user.email === email);

    if (userIndex === -1) {
        return res.status(404).json({ message: "User not found" });
    }

    users[userIndex] = { 
        ...users[userIndex], 
        name: name || users[userIndex].name,
        email: newEmail || users[userIndex].email
    };

    res.status(200).json({ message: "User updated", data: users[userIndex] });
};

const deleteUser = (req, res) => {
    const { email } = req.params;

    const userIndex = users.findIndex(user => user.email === email);

    if (userIndex === -1) {
        return res.status(404).json({ message: "User not found" });
    }

    users.splice(userIndex, 1);

    return res.status(200).json({
        message: `User with email ${email} deleted successfully`
    });
};

module.exports = {
    getUsers, 
    getUserByEmail,
    postUsers,
    updateUser,
    deleteUser
}