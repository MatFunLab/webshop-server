const jwt = require('jsonwebtoken');
const tokenService = require('../../services/token.service');

exports.generateAuthToken =  (user) => {
    const token = jwt.sign({id: user.id.toString()}, "krk");
    return tokenService.addToken(token, user.id);
  }
