const express = require('express');
const { check } = require('express-validator/check');

const userController = require('../controllers/user.controller');
const auth = require('../middleware/auth');


const router = express.Router();

router.post('/signup', [ 
    check('email').isEmail().normalizeEmail(), 
    check('password').isLength({min: 8, max: 35}).trim() 
    ],
     userController.signup);
router.post('/login',  [ 
    check('email').isEmail().normalizeEmail(), 
    check('password').isLength({min: 8, max: 35}).trim() 
    ], 
     userController.login);
router.post('/logout', auth, userController.logout);
router.post('/logoutAll', auth, userController.logoutAll);
router.delete('/deleteme', auth, userController.deleteMe)
module.exports = router;