const express = require('express');
const path = require('path');
const rootDirectory = require('../utils/path-util');
const productController = require('../controllers/product.controller');
const shopController = require('../controllers/shop.controller');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/shop/products', productController.getProducts); 
router.get('/shop/categories', shopController.getCategories);
router.post('/shop/cart', auth, shopController.addToCart);
router.delete('/shop/cart', auth, shopController.deleteFromCart);
router.patch('/shop/cart', auth, shopController.updateItemInCart);
router.get('/shop/cart', auth, shopController.getCart);
router.get('/shop/checkout', auth, shopController.getCheckout);
router.get('/invoice/:id', auth, shopController.getInvoice);

module.exports = router;