const pool = require('../config/db');
const productQueries = require('../queries/products');

const getProducts = ()=>{
    return new Promise((resolve,reject)=>{
    pool.query(productQueries.getProducts,(error,results)=>{
        if(error) reject(error)
        else resolve(results.rows);

    })
})
}
const getProductById = (id)=>{
    return new Promise((resolve,reject)=>{
    pool.query(productQueries.getProductById,[id],(error,results)=>{
        if(error) reject(error);
        else resolve(results.rows)

    })
})
}

const createProduct = (title, image, price, offer_price)=>{
    return new Promise((resolve,reject)=>{
        pool.query(productQueries.createProduct,[title, image, price, offer_price],(error,results)=>{
            if(error) reject(error);
            else resolve(true)
    
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
        pool.query(productQueries.updateProduct,[title, image, price, offer_price,id],(error,results)=>{
            if(error) reject( error);
            else resolve(true);
    })
})
}
const deleteProduct = (id)=>{
    return new Promise((resolve,reject)=>{
        pool.query(productQueries.deleteProduct,[id],(error,results)=>{
            if(error) reject( error);
            else resolve(true);
    })
})
}

module.exports = {getProducts,createProduct,getProductById,checkProductExists,updateProduct,deleteProduct};