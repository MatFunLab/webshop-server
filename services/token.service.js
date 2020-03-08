const Token = require('../models/token.model');

exports.addToken = (hashedValue, id) => {
    const result = Token.create({
        uniqueString: hashedValue,
        userId: id
      }).then((addedToken) => {
          if(!addedToken) {
            throw new Error();
          }
        return addedToken;
      });
    
      return result;
}

exports.deleteToken = (token) => {
  const result = Token.findOne({
    where: {
      uniqueString: token
    }
}).then(foundToken => {
 if(!foundToken) {
  throw new Error();
 } 
  foundToken.destroy();
   return foundToken;
});
  
  return result;
}

exports.deleteAllTokens = (user) => {
  const result = Token.findAll({where: {
    userId: user.id
  }}).then(tokens => {
    if(tokens.length === 0) {
      throw new Error();
    }
    tokens.forEach(element => {
      element.destroy();
    });
    return tokens;
  });
  return result;
}
