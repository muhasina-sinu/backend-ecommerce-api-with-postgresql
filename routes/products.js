const express = require('express');
const router = express.Router();
const {getProducts,getProductById,createProduct,updateProduct,deleteProduct,getProductsByCategoryId,getProductsByBrandId}= require('../controllers/products');
const { verifyTokenHandler,verifyRoles } = require('../middlewares/jwtHandler');

router.get('/',getProducts);
router.get('/:id',getProductById);
router.get('/categories/:categoryId',getProductsByCategoryId);
router.get('/brands/:brandId',getProductsByBrandId);
router.post('/',[verifyTokenHandler,verifyRoles(['admin'])],createProduct);
router.put('/:id',[verifyTokenHandler,verifyRoles(['admin'])],updateProduct);
router.delete('/:id',[verifyTokenHandler,verifyRoles(['admin'])],deleteProduct);





module.exports = router;