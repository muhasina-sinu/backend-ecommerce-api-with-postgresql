const pool = require('../config/db');
const productQueries = require('../queries/products');
const Product = require('../models/product');

const getProducts = ()=>{
    return new Promise((resolve,reject)=>{
        Product.findAll().then(products=>{
            resolve(products);
        }).catch(error=>{
            reject(error);
        })
})
}

const getProductById = (id)=>{
    return new Promise((resolve,reject)=>{
        Product.findOne({
            where:{
                id:id
            }
        }).then(product =>{
            resolve(product);
        }).catch(error=>{
            reject(error);
        })
})
}

const createProduct = (title, image, price, offer_price)=>{
    return new Promise((resolve,reject)=>{
        Product.create({title, image, price, offer_price}).then(data=>{
            resolve(true)
        }).catch(error=>{
            reject(error);
        })
    })
}
const checkProductExists = (id)=>{
    return new Promise((resolve,reject)=>{
    pool.query(productQueries.getProductById,[id],(error,results)=>{
        if(error) resolve(false);
        else resolve(results.rows.length>0);

    })
})
}

const updateProduct = (title, image, price, offer_price,id)=>{
    return new Promise((resolve,reject)=>{
        Product.update(
            {title, image, price, offer_price},
            { where: {id: id } }
        ).then(data=>{
            resolve(true)
        }).catch(error=>{
            reject(error);
        })
})
}
const deleteProduct = (id)=>{
    return new Promise((resolve,reject)=>{
        Product.destroy({
            where:{
                id:id
            }
        }).then(product =>{
            resolve(true);
        }).catch(error=>{
            reject(error);
        })
})
}

module.exports = {getProducts,createProduct,getProductById,checkProductExists,updateProduct,deleteProduct};