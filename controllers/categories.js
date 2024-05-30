const asyncHandler = require('../middlewares/asyncHandler');
const categoryRepositories = require('../repositories/categories')

const getCategories = asyncHandler(async(req,res,next)=>{
    const categories = await categoryRepositories.getCategories();
    res.status(200).json(categories);
})
const createCategory= asyncHandler(async (req,res,next)=>{
    const { name} = req.body;
    const result =await categoryRepositories.createCategory(name)
    res.status(200).json({ 
        success:true,
        message: "new category added successfully",
       });

})

module.exports = {getCategories,createCategory};