const express = require('express');
const { getBrands,createBrand } = require('../controllers/brands');
const router = express.Router();

router.get('/',getBrands);
router.post('/',createBrand);

module.exports = router;