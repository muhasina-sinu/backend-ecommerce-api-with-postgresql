const asyncHandler = require('../middlewares/asyncHandler');
const brandRepositories = require('../repositories/brands')

const getBrands = asyncHandler(async(req,res,next)=>{
    const brands = await brandRepositories.getBrands();
    res.status(200).json(brands);
})
const createBrand= asyncHandler(async (req,res,next)=>{
    const { name} = req.body;
    const result =await brandRepositories.createBrand(name);
    res.status(200).json({ 
        success:true,
        message: "new category added successfully",
       });

})

module.exports = {getBrands,createBrand};