class IUserRepository {
    async save(user) {
        throw new Error("Method save() not implemented");
    }

    async getAll() {
        throw new Error("Method getAll() not implemented");
    }

    async findById(id) { 
        throw new Error("Method findById() not implemented");
    }

    async deleteUser(id) {
        throw new Error("Method deleteUser() not implemented");
    }
}

module.exports = IUserRepository;
