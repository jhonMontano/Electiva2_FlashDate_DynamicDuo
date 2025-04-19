const MatchModel = require("./model/MatchModel");
const IUmatchRepository = require("../../domain/repositories/IUmatchRepository");
const SwipeModel = require("./model/SwipeModel");
const mongoose = require("mongoose");

class MatchRepository extends IUmatchRepository {
    async createMatch(user1, user2) {
        const match = new MatchModel({ users: [user1, user2] });
        return await match.save();
    }

    async getMatchesByUser(userId) {
        return await MatchModel.find({
            users: new mongoose.Types.ObjectId(userId)
        }).populate("users");
    }

    async hasUserLikedBack(userId, targetUserId) {
        return await SwipeModel.exists({
            userId: targetUserId,
            targetUserId: userId,
            action: "like"
        });
    }
}

module.exports = MatchRepository;
