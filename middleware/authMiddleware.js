const jwt = require('jsonwebtoken');
const User = require('../models/User');

const requireAuth = (req,res,next) =>{
    const token = req.cookies.jwt;

    if(token){
        jwt.verify(token, 'jwt secret', (err, decodedToken) =>{
            // if received err then the jwt is wrong so user has to login again
            if(err){
                console.log(err.message);
                res.redirect('/login');
            }else{
                console.log(decodedToken);
                next();
            }
        });
    }else{
        res.redirect('/login');
    }
};

const checkUser = (req,res,next)=>{
    const token = req.cookies.jwt;

    if(req.cookies.jwt){
        jwt.verify(token, 'jwt secret', async (err, decodedToken) =>{
            // if received err then the jwt is wrong so user has to login again
            if(err){
                console.log(err.message);
                res.locals.user = null;
                next();
            }else{
                console.log(decodedToken);
                let user = await User.findById(decodedToken.id);
                // this will make all the views to access the object user
                res.locals.user = user;
                next();
            }
        });
    }else{
        res.locals.user = null;
        next();
    }
};

const loginAndSignupPage = (req,res,next) =>{
    const token = req.cookies.jwt;
    if(token){
        jwt.verify(token, 'jwt secret', (err, decodedToken) =>{
            // if received err then the jwt is wrong so user has to login again
            if(err){
                console.log(err.message);
                next();
            }else{
                console.log(decodedToken);
                res.redirect('/');
            }
        });
    }else{
        next();
    }
};


module.exports = {
    requireAuth,
    checkUser,
    loginAndSignupPage
};