const {OrderLine,Order,Product,User} = require('../models/product');
const sequelize = require('../config/orm');

const createOrder =  async (user_id,orderlines)=>{
    try{
        
        const newOrder = await Order.create({total_amount:0,user_id});
        const order_id =newOrder.id;
        for (let orderline of orderlines) {
            const { product_id, quantity } = orderline;
            const price = await getUnitPrice(product_id);
            const unit_price = price.offer_price;
            const total_price = quantity * unit_price ;
            await OrderLine.create({
              quantity,
              unit_price,
              total_price,
              order_id,
              product_id
            });
        }
        const total = await getTotalAmount(order_id);
        const total_amount =total[0].dataValues.total_amount;
        console.log(total_amount);
        await Order.update(
            { total_amount: total_amount},
            { where: { id: order_id } }
          );

    }  
    catch(error){
        throw error;
    }
}

const getOrders = ()=>{
    return new Promise((resolve,reject)=>{
        Order.findAll().then(order =>{
             resolve(order);
         }).catch(error=>{
             reject(error);
         })
        })
}

const getOrderById = (id)=>{
    return new Promise((resolve,reject)=>{
       Order.findOne({
            attributes:['id','total_amount','user_id'],
            where:{
                id:id
            },
            include: [
                {
                    model: OrderLine,
                    attributes: ['quantity','unit_price','total_price'] ,
                    include: [
                        {
                          model: Product,
                          attributes: ['title']
                        }
                      ] 
                }
            ]

        }).then(order =>{
            resolve(order);
        }).catch(error=>{
            reject(error);
        })
})}

const getOrdersByUserId = (user_id)=>{
    return new Promise((resolve,reject)=>{
        Order.findAll({
            attributes:['id','total_amount'],
            where:{
                user_id:user_id
            },
            include:[{
                model:User,
                attributes:['name']
            }]
        }).then(orders =>{
            resolve(orders);
        }).catch(error=>{
            reject(error);
        })
    })
}

const getUnitPrice = (product_id)=>{
    return new Promise((resolve,reject)=>{
        Product.findOne({
            where:{
                id:product_id
            },
            attributes:
                ['offer_price']
            

        }).then(price =>{
            resolve(price);
        }).catch(error=>{
            reject(error);
        })
})}


const getTotalAmount = (order_id)=>{
    return new Promise((resolve,reject)=>{
        OrderLine.findAll({
            attributes: [[sequelize.fn('SUM', sequelize.col('total_price')),'total_amount']],
            where: { order_id: order_id }
        }).then(total =>{
            resolve(total);
        }).catch(error=>{
            
            reject(error);
        })
    })
}

module.exports = {createOrder,getTotalAmount,getOrderById,getOrders,getOrdersByUserId}