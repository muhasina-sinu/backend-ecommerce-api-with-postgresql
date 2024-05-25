const pool = require("../config/db");
const userQueries = require("../queries/users");
const {hashPassword} = require("../utils/passwordHelper");

const createUser = (name,username,password) => {
    const hashedPassword = hashPassword(password);
    return new Promise ((resolve,reject) => {
      pool.query(userQueries.createUser,[name,username,hashedPassword],(error,results)=>{
        if(error) {reject(error);}
        else{
          const userId = results.rows?results.rows[0].id:undefined;
          resolve(userId);
        }
      })
    })
  }

  const getUser = (username)=> {
    return new Promise((resolve,reject)=>{
      pool.query(userQueries.getUser,[username],(error,results)=>{
        if(error) reject(error);
        else{
          resolve(results.rows);
        }
      })
    })
  }

  const getRolesById = (userid)=> {
    return new Promise((resolve,reject)=>{
      pool.query(userQueries.getRolesById,[userid],(error,results)=>{
        if(error) reject(error);
        else{
          resolve(results.rows);
        }
      })
    })
  }

  module.exports = {createUser,getUser,getRolesById};
  