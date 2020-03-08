const express = require('express');
const { check } = require('express-validator/check');
const productController = require('../controllers/product.controller');
const healthController = require('../controllers/health.controller');

const router = express.Router();

router.post('/admin/addProduct', [ 
    check('name').isLength({min: 2, max: 20}).trim(),
    check('price').isDecimal().isLength({min: 1, max: 10}).trim(),
    check('desc').trim().isLength({min: 3, max: 1000}),
    ],  
     productController.addProduct);
     
router.post('/admin/addCategory', productController.addCategory);

 //from cron job
router.post('/admin/productSalesInfo', productController.getProductSalesInfoFromCron);
router.get('/admin/productSalesInfo', productController.getProductSalesInfoFromServer);
//send health info to cron job
router.get('/admin/checkHealth', healthController.getAppHealth);

router.get('/admin/product/:id', productController.getOneProduct);

router.get('/admin/products', productController.getProducts);

router.delete('/admin/product', productController.deleteProduct);

router.patch('/admin/product', [ 
    check('name').isLength({min: 2, max: 20}).trim(),
    check('price').isFloat().isLength({min: 1, max: 10}).trim(),
    check('desc').isLength({min: 3, max: 1000}).trim() 
    ],  
     productController.updateProduct);

module.exports = router;