const {verifyToken} = require("../utils/jwtHelper");
const {getRolesById} = require("../repositories/users");
const { ErrorResponse } = require("../utils/errorResponse");

const verifyTokenHandler = async (req,res,next) => {
    var token = req.headers['authorization'];
    if(token && token.includes('Bearer')){
        try{
            const result = await verifyToken(token);
            const userid = result.userId;
            req.userid = userid;
            return next();
        }
        catch(error){
            res.status(401).json("invalid token");
            }
        }  
    else{
        next(new ErrorResponse('no token provided',401));
        //res.status(401).json("no token provided");
    }
    }
;
const verifyRoles = (roles) =>{
    return async(req,res,next)=>{
        const userid = req.userid;
        const userRoles = await getRolesById(userid);
        let hasRole = false;
        for(let userRole of userRoles){
            if(roles.includes(userRole.name)){
                hasRole =true;
                break;
            }
        }
        if(hasRole){
            next();
        }else{
            return res.status(403).json("you dont have permission")
        }
 }
} 

module.exports = {verifyTokenHandler,verifyRoles};