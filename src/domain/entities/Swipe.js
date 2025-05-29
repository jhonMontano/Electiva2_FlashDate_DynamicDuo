class Swipe {
    constructor({ userId, targetUserId, action }) {
        this.userId = userId;
        this.targetUserId = targetUserId;
        this.action = action;
    }
}

module.exports = Swipe;
