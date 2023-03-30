const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
    windowMs: 1000 * 60,
    max: 50,
    message: "Too many requests, please try again later."
});

module.exports = limiter;