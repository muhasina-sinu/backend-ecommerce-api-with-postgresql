const Sequelize = require('sequelize');

const dbConfig = {
    user : "test",
    password:"test",
    host:"localhost",
    port:5432,
    database:"sequelproducts"
}

const sequelize = new Sequelize(dbConfig.database,dbConfig.user,dbConfig.password,{
    host:'localhost',
    dialect:'postgres'

})

sequelize.authenticate().then(()=>{
    console.log("connected succesfully")
    sequelize.sync().then((data)=>{
        console.log("models synced")
    }).catch((error)=>{
        console.log("models sync failed",error)
    })
}).catch((error)=>{
    console.log("connection failed",error)
})

module.exports = sequelize;