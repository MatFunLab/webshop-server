const User = require('../models/user.model');
const tokenService = require('../services/token.service');

//signup
exports.addUser = (name, surname, email, password) => {
  const result = User.create({
    name: name,
    surname: surname,
    email: email,
    password: password,
    roleId: 2
  }).then((addedUser) => {
      if(!addedUser) {
        throw new Error();
      }
    return addedUser;
  });

  return result;
  }

exports.getUsers = () => {
    
  }

  //login
  exports.getOneUser = (email, pass) => {
  
    const result = User.findOne({ where: {email: email, password: pass}}).then((addedUser) => {
        if(!addedUser) {
          throw new Error();
        }
      return addedUser;
    });
    return result;
  }

  exports.deleteUser = () => {
   
  }