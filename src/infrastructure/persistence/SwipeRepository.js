const SwipeModel = require("./model/SwipeModel");
const IUswipeRepository = require("../../domain/repositories/IUswipeRepository");

class SwipeRepository extends IUswipeRepository{
    async saveSwipe(data){
        return await SwipeModel.create(data);
    }

    async hasUserLikedBack( userId, targetUserId){
        return await SwipeModel.findOne({
            userId: targetUserId,
            targetUserId: userId,
            action: "like"
        });
    }
}

module.exports = SwipeRepository;