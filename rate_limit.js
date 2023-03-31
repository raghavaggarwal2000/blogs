const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
    windowMs: 1000 * 60,// 1min, ie 
    max: 100,
    message: "Too many requests, please try again later."
});

module.exports = limiter;