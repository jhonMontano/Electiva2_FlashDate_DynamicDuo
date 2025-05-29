const SwipeModel = require("./model/SwipeModel");
const IUswipeRepository = require("../../domain/repositories/IUswipeRepository");

class SwipeRepository extends IUswipeRepository {
    async saveSwipe(data) {
        return await SwipeModel.create(data);
    }
}

module.exports = SwipeRepository;
