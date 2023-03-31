const time = 1000 * 60;     // 1 min
const message = "Too many requests, please try again later.";
const max = 5;

const rate_limiter = (req,res, next) => {
    if(req.cookies.ip){
        let count = req.cookies.count;
        if(count >= max){
            return res.send(message);   
        }else{
            count = parseInt(count) + 1;
            res.cookie('count',count , {
                maxAge: time
            });
        }
    }else{
        res.cookie('ip', req.ip, {
            maxAge: time
        });
        res.cookie('count',1,{maxAge :time});
    }
    next();
};

module.exports = rate_limiter;