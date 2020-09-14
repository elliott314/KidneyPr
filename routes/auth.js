const jwt = require('jsonwebtoken');
function verifyUser(req, res, next){
    let authHeader = req.headers.authorization;
    if(!authHeader){
        let err= new Error('No Authenitication information');
        err.status = 401;
        return next(err);
    }
    let token = authHeader.split(' ');
    jwt.verify(token, process.env.SECRET, (err, payload)=>{
        if(err){
            let err = new Error('Token not verified!');
            return next(err);
        }
        console.log(payload);
    })
};
module.exports = verifyUser;