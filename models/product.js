var sequelize = require('../config/orm');
const {Sequelize, DataTypes} = require('sequelize');

const Product = sequelize.define('product',{
    id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        primaryKey:true,
        autoIncrement:true
    },
    title:DataTypes.STRING,
    image:DataTypes.STRING,
    price:DataTypes.DECIMAL,
    offer_price:DataTypes.DECIMAL
})

const Category = sequelize.define('category',{
        id:{
            type:DataTypes.INTEGER,
            allowNull:false,
            primaryKey:true,
            autoIncrement:true
        },
        name:DataTypes.STRING
    })
Category.hasMany(Product,{foreignKey:'category_id'});
Product.belongsTo(Category,{foreignKey:'category_id'});

const Brand = sequelize.define('brand',{
        id:{
            type:DataTypes.INTEGER,
            allowNull:false,
            primaryKey:true,
            autoIncrement:true
        },
        name:DataTypes.STRING
    })

Brand.hasMany(Product,{foreignKey:'brand_id'});
Product.belongsTo(Brand,{foreignKey:'brand_id'});

// const Order = sequelize.define('order',{
//     id:{
//         type:DataTypes.INTEGER,
//         allowNull:false,
//         primaryKey:true,
//         autoIncrement:true
//     },
//     total_amount:DataTypes.DECIMAL
// })
// User.hasMany(Order,{foreignKey:'user_id'});
// Order.belongsTo(User,{foreignKey:'user_id'});

// const Role = sequelize.define('role',{
//     id:{
//         type:DataTypes.INTEGER,
//         allowNull:false,
//         primaryKey:true,
//         autoIncrement:true
//     },
//     name:DataTypes.STRING
// })


// const User = sequelize.define('user',{
//     id:{
//         type:DataTypes.INTEGER,
//         allowNull:false,
//         primaryKey:true,
//         autoIncrement:true
//     },
//     name:DataTypes.STRING,
//     username:{
//         type:DataTypes.INTEGER,
//         allowNull:false,
//     },
//     password:{
//         type:DataTypes.STRING,
//         allowNull:false,
//     },
// })

// User.belongsToMany(Role,{through:'user-roles',foreignKey:"role_id"});
// Role.belongsToMany(User,{through:'user-roles',foreignKey:"user_id"});


module.exports = {Product,Category,Brand};