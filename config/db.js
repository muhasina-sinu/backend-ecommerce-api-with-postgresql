const {Pool} = require('pg');

const pool = new Pool({
    user : "test",
    password:"test",
    host:"localhost",
    port:5432,
    database:"productsdb"
})

module.exports = pool;