var jwt = require('jsonwebtoken');
var secret = "abcd1234";

function createJwt(userId){
    var token = jwt.sign({ userId: userId }, secret);
    return token;
}

function verifyToken(token){
    return new Promise((resolve,reject)=>{
        var formattedToken = token.replace('Bearer ','');
        jwt.verify(formattedToken,secret,(err,decoded)=>{
            if (err) 
                return reject({valid:false,error:err});
            resolve ({valid:true,userId:decoded.userId});
    })

        
    })
}

module.exports = { createJwt,verifyToken};