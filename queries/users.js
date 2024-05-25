const createUser = "insert into users (name,username,password) values ($1,$2,$3) RETURNING ID";
const getUser = "select id,name,username,password from users where username =$1";
const getRolesById = "select r.name from roles r inner join userroles ur on ur.role_id = r.id where ur.user_id=$1";

module.exports = {createUser,getUser,getRolesById};