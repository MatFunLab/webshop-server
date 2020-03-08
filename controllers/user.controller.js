const { validationResult } = require('express-validator/check');

const userService = require('../services/user.service');
const tokenService = require('../services/token.service');
const cartService = require('../services/cart.service');
const generateAuthToken = require('../utils/authorization/generateAuthToken');
const hashUtil = require('../utils/hash-util');

exports.signup = (req, res) => {
  const name = req.body.name;
  const surname = req.body.surname;
  const email = req.body.email;
  const password = req.body.password;
  //validation errors from login.js 
  const validationErrors = validationResult(req);
 
  if(!validationErrors.isEmpty()) {
    return res.status(422).send({failure: -1, message:"Not valid email or password"});
  }

   hashUtil.getHashedValue(password).then(hashedPass => {
     if(!hashedPass) {
       throw new Error();
     }
     pass = hashedPass;
     const user = userService.addUser(name, surname, email, pass).then(addedUser => {
     generateAuthToken.generateAuthToken(addedUser.dataValues).then(token => {
      res.send(token);
     });
    });

   }).catch(err => {
    res.status(500).send(err);
   });
}

exports.login = (req, res) => {
 const pass = req.body.password;
 const email = req.body.email;

 //validation errors from login.js middleware
 const validationErrors = validationResult(req);
 if(!validationErrors.isEmpty()) {
   return res.status(422).send({failure: -1, message:"Not valid email"});
 }

  hashUtil.getMatchPass(pass, email).then(user => {
    if(!user) {
      throw new Error();
    }
      generateAuthToken.generateAuthToken(user.dataValues).then(token => {
        res.send(token); 
      });
  })
  .catch(err => {
    res.status(400).send(err);
  });
}

exports.logout = (req, res) => {
 tokenService.deleteToken(req.token).then(deletedToken => {
    res.send(deletedToken);
 }).catch(err => {
   
   res.status(500).send(err);
 });

}
exports.logoutAll = (req, res) => {
  tokenService.deleteAllTokens(req.user).then(tokens => {
    res.send(tokens);
  }).catch(err => {
    res.status(401).send(err);
  })
}

exports.deleteMe = (req, res) => {
  tokenService.deleteAllTokens(req.user).then(tokens => {
    res.send(tokens);
  }).catch(err => {
    res.status(401).send(err);
  });
  cartService.deleteCart().then().catch();
  userService.deleteUser().then().catch();
}
  
