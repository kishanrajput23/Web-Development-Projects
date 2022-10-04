class ExpressError extends Error {
    constructor(status, message) {
        super(); //this will call Error in line 1
        this.status = status;
        this.message = message;
    }
}

module.exports = ExpressError;