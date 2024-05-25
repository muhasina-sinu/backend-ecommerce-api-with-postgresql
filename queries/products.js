const getProducts = "select * from products";
const getProductById = "select * from products where id=$1";
const createProduct = "insert into products (title,image,price,offer_price) values ($1,$2,$3,$4)";
const updateProduct = "update products set title=$1,image=$2,price=$3,offer_price=$4 where id=$5";
const deleteProduct = "delete from products where id=$1"

module.exports = {getProducts,getProductById,createProduct,updateProduct,deleteProduct};