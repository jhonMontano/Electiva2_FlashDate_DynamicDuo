class SwipeController{
    constructor(swipeService){
        this.swipeService = swipeService;
    }

    async swipe(req, res){
        try {
            const{userId, targetUserId, action} = req.body;
            const result = await this.swipeService.handleSwipe(userId, targetUserId, action);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    }

    async getMatches(req, res){
        try {
            const userId = req.params.userId;
            const matches = await this.swipeService.getMatches(userId);
            res.status(200).json(matches);
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    }
}

module.exports = SwipeController;