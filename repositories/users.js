const pool = require("../config/db");
const userQueries = require("../queries/users");
const {hashPassword} = require("../utils/passwordHelper");
const {Customer} = require('../models/product');

const createUser = (name,username,password) => {
    const hashedPassword =hashPassword(password);
      return new Promise ((resolve,reject) => {
          Customer.create({name,username,password:hashedPassword}).then(data=>{
            resolve(true)
        }).catch(error=>{
            reject(error);
        })
      
    })
  }
  

  const getUser = (username)=> {
    return new Promise((resolve,reject)=>{
      Customer.findOne({
        where:{
          username:username
        }
      }).then(data=>{
        resolve(data)
      }).catch(error=>{
        reject(error)
      })
    })
  }

  const updateUser = (user_id,name,password)=> {
    return new Promise((resolve,reject)=>{
      Customer.update(
        {name,password},
        {where:{
          id:user_id
        }}
      ).then(data=>{
        resolve(true)
      }).catch(error=>{
        reject(error)
      })
    })
  }

  const getUsers = ()=> {
    return new Promise((resolve,reject)=>{
      Customer.findAll().then(data=>{
        resolve(data)
      }).catch(error=>{
        reject(error)
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

  module.exports = {createUser,getUser,getRolesById,getUsers,updateUser};
  