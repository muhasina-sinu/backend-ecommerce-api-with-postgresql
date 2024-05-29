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


module.exports = Product;