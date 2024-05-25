const userRepositories = require("../repositories/users");
const asyncHandler = require("../middlewares/asyncHandler");
const {createJwt} = require("../utils/jwtHelper");
const { ErrorResponse } = require("../utils/errorResponse");
const {verifyPassword} = require("../utils/passwordHelper");

//@desc create a new user
//@router post /api/auth/signup
//@access public

const addNewUser = asyncHandler(async (req, res, next) => {
    const { name,username,password } = req.body;
    const users = await userRepositories.getUser(username);
    if(users && users.length>0){
      return next(new ErrorResponse(`username ${username} already exists`, 400));
    }
    const userId = await userRepositories.createUser(name,username,password);
    const token = createJwt(userId);
    if(userId){
    res.status(201).json({ 
      success:true,
      data : {
        message: "new user added successfully",
        name:name,
        token : token
    } });}
  });

//@desc login
//@router post /api/auth/login
//@access public

  const login = asyncHandler(async (req,res,next)=>{
    const {username,password} = req.body;
    const users =  await userRepositories.getUser(username);
    if(!users || users.length == 0){
      return next(new ErrorResponse(`invalid credentials`, 400));
    }
    const user = users[0];
    const isValid = verifyPassword(password,user.password);
    if(isValid){
      const token = createJwt(user.id);
      res.status(200).json({ 
        success:true,
        data : {
          message: "logged in successfully",
          name:`${user.name}`},
          token : token
       });
    }
    return next(new ErrorResponse(`invalid credentials`, 400));
  });
  
  module.exports = {addNewUser,login};