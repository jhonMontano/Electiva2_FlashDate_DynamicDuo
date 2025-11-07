const { invokeSendEmailLambda } = require("../../infrastructure/aws/lambdaClient");

class SwipeService {
  constructor(swipeRepository, matchRepository, io, userRepository) {
    this.swipeRepository = swipeRepository;
    this.matchRepository = matchRepository;
    this.io = io;
    this.userRepository = userRepository;
  }

  async handleSwipe(userId, targetUserId, action) {
    await this.swipeRepository.saveSwipe({ userId, targetUserId, action });

    if (action === "like") {
      const hasMatch = await this.matchRepository.hasUserLikedBack(userId, targetUserId);

      if (hasMatch) {
        const match = await this.matchRepository.createMatch(userId, targetUserId);


        this.io.to(userId).emit("newMatch", { match });
        this.io.to(targetUserId).emit("newMatch", { match });

        
       const [targetUser, user] = await Promise.all([
          this.userRepository.findById(targetUserId),
          this.userRepository.findById(userId)
        ]);

    
        await invokeSendEmailLambda({
          username: targetUser.name,
          body: `¡Has hecho match con ${user.name}! 🎉 Ahora pueden comenzar a hablar.`,
          targetEmail: targetUser.email,
          originEmail: user.email
        });

    
        await invokeSendEmailLambda({
          username: user.name,
          body: `¡Has hecho match con ${targetUser.name}! 🎉 Ahora pueden comenzar a hablar.`,
          targetEmail: user.email,
          originEmail: targetUser.email
        });

        console.log("Match creado:", match);

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
