
const {Brand} = require('../models/product');

const getBrands = ()=>{
    return new Promise((resolve,reject)=>{
        Brand.findAll().then(brands=>{
            resolve(brands);
        }).catch(error=>{
            reject(error);
        })
})
}

const createBrand = (name)=>{
    return new Promise((resolve,reject)=>{
        Brand.create({name}).then(data=>{
            resolve(true)
        }).catch(error=>{
            reject(error);
        })
    })
}

module.exports = {getBrands,createBrand};