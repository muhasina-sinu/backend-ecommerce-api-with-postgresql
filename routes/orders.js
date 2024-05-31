const express = require('express');
const router = express.Router();
const orders =require('../controllers/orders');
const {verifyTokenHandler} = require('../middlewares/jwtHandler');

router.post('/',[verifyTokenHandler],orders.createOrder);
router.get('/:id',orders.getOrderById);
router.get('/',orders.getOrders);
router.get('/users/:user_id',orders.getOrdersByUserId);


module.exports = router;