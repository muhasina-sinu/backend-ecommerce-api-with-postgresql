const express = require('express');
const router = express.Router();
const users =require('../controllers/users');

router.post('/signup',users.addNewUser);
router.post('/login',users.login);

module.exports = router;