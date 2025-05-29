class SwipeService {
    constructor(swipeRepository, matchRepository, io) {
        this.swipeRepository = swipeRepository;
        this.matchRepository = matchRepository;
        this.io = io;
    }

    async handleSwipe(userId, targetUserId, action) {
        await this.swipeRepository.saveSwipe({ userId, targetUserId, action });

        if (action === "like") {
            const hasMatch = await this.matchRepository.hasUserLikedBack(userId, targetUserId);
            if (hasMatch) {
                const match = await this.matchRepository.createMatch(userId, targetUserId);

                this.io.to(userId).emit('newMatch', { match });
                this.io.to(targetUserId).emit('newMatch', { match });

                return { match: true, matchId: match._id };
            }
        }

        return { match: false };
    }

    async getMatches(userId) {
        return await this.matchRepository.getMatchesByUser(userId);
    }
}

module.exports = SwipeService;
