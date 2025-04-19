class SwipeService {
    constructor(swipeRepository, matchRepository) {
        this.swipeRepository = swipeRepository;
        this.matchRepository = matchRepository;
    }

    async handleSwipe(userId, targetUserId, action) {
        await this.swipeRepository.saveSwipe({ userId, targetUserId, action });

        if (action === "like") {
            const hasMatch = await this.matchRepository.hasUserLikedBack(userId, targetUserId);
            if (hasMatch) {
                const match = await this.matchRepository.createMatch(userId, targetUserId);
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