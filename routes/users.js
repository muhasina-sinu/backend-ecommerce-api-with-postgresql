const express = require('express');
const router = express.Router();
const users =require('../controllers/users');
const {verifyTokenHandler,verifyRoles} = require('../middlewares/jwtHandler')

router.post('/signup',users.addNewUser);
router.post('/login',users.login);
router.get('/users',[verifyTokenHandler,verifyRoles(['admin'])],users.getUsers);
router.patch('/users',[verifyTokenHandler],users.updateUser)

module.exports = router;