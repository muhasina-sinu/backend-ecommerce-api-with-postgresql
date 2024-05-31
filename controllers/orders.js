const asyncHandler = require('../middlewares/asyncHandler');
const orderRepositories = require('../repositories/orders')

const getOrders = asyncHandler(async(req,res,next)=>{
    const orders = await orderRepositories.getOrders();
    res.status(200).json(orders);
})

const getOrderById = asyncHandler(async (req,res,next)=>{
    oredr_id = req.params.id;
    const order = await orderRepositories.getOrderById(oredr_id);
    res.status(200).json({ order});
})

const createOrder= asyncHandler(async (req,res,next)=>{
    const  orderlines = req.body;
    console.log(orderlines);
    const user_id = req.userid;
    const result =await orderRepositories.createOrder(user_id,orderlines);
    res.status(201).json({ 
        success:true,
        message: "new order added successfully",
       });

})

const getOrdersByUserId = asyncHandler(async(req,res,next)=>{
    const user_id = req.params.user_id;
    const orders = await orderRepositories.getOrdersByUserId(user_id);
    res.status(200).json(orders);
})


module.exports = {createOrder,getOrderById,getOrders,getOrdersByUserId};