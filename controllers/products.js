const pool = require('../config/db');
const productQueries = require('../queries/products');
const productRepositories = require('../repositories/products');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middlewares/asyncHandler');

//@desc get all products
//@route GET /api/products
//@access public

const getProducts= asyncHandler(async(req,res,next)=>{
    const products = await productRepositories.getProducts();
    res.status(200).json(products);
});

//@desc get product by id
//@route GET /api/products/id
//@access public
const getProductById= asyncHandler(async (req,res,next)=>{
        const id =req.params.id;
        const product = await productRepositories.getProductById(id)
        res.status(200).json(product);
    
    });
    
//@desc create a new product
//@route POST /api/products
//@access admin
const createProduct= asyncHandler(async (req,res,next)=>{
        const { title, image, price, offer_price ,category_id, brand_id} = req.body;
        const result =await productRepositories.createProduct(title, image, price, offer_price,category_id, brand_id)
        res.status(200).json({ 
            success:true,
            message: "new product added successfully",
            title:title
           });
   
    
    
})

//@desc update product by id
//@route PUT /api/products/id
//@access admin
const updateProduct= asyncHandler(async(req,res,next)=>{
    
        const id =req.params.id;
        const { title, image, price, offer_price, category_id, brand_id } = req.body;
        const productExists = await productRepositories.checkProductExists(id);
        if(productExists){
            productRepositories.updateProduct(title, image, price, offer_price,category_id, brand_id,id).then(data=>{
                res.status(200).json({ 
                    success:true,
                    message: "product updated successfully",
                    title:title });
            })
        }
        else{
            next(new ErrorResponse("invalid id",404));
        }
    
        
})

//@desc delete product
//@route DELETE /api/products/id
//@access admin
const deleteProduct= asyncHandler(async(req,res,next)=>{
    const id =req.params.id;
    const productExists = await productRepositories.checkProductExists(id);
        if(productExists){
            productRepositories.deleteProduct(id).then(data=>{
                res.status(200).json({ 
                    success:true,
                    message: "product deleted succesfully" });
            })
        }
        else{
            next(new ErrorResponse("invalid id",404));
        }
    }  )

//@desc get products by category id
//@route GET /api/products/categories/category_id
//@access public
const getProductsByCategoryId= asyncHandler(async (req,res,next)=>{
    const categoryId =req.params.categoryId;
    const products = await productRepositories.getProductsByCategoryId(categoryId);
    res.status(200).json(products);

});

//@desc get products by brand id
//@route GET /api/products/brands/brand_id
//@access public
const getProductsByBrandId= asyncHandler(async (req,res,next)=>{
    const brandId =req.params.brandId;
    const products = await productRepositories.getProductsByBrandId(brandId);
    res.status(200).json(products);

});

module.exports = {getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    getProductsByCategoryId,
    getProductsByBrandId};