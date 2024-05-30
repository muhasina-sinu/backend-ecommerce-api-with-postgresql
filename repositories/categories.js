
const {Category} = require('../models/product');

const getCategories = ()=>{
    return new Promise((resolve,reject)=>{
        Category.findAll().then(categories=>{
            resolve(categories);
        }).catch(error=>{
            reject(error);
        })
})
}

const createCategory = (name)=>{
    return new Promise((resolve,reject)=>{
        Category.create({name}).then(data=>{
            resolve(true)
        }).catch(error=>{
            reject(error);
        })
    })
}

module.exports = {getCategories,createCategory};