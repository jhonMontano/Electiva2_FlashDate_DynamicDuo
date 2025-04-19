class IUswipeRepository{
    async saveSwipe(data){
        throw new Error("Method not implemented");
    }

    async hasUserLikeBack(userId, targetUserId){
        throw new Error("Method not implemented");
    }
}

module.exports = IUswipeRepository;