const bcrypt = require('bcryptjs');
const User = require('../models/user.model');

exports.getHashedValue = async (value) => {
    const hashedValue = await bcrypt.hash(value, 8);
    return hashedValue;
}
    
exports.getMatchPass = (hashedPass, email) => {
   
  const user = User.findOne({where: { email:email }}).then((foundUser) => {
      if(!foundUser) {
          throw new Error();
      }
      const user = bcrypt.compare(hashedPass, foundUser.dataValues.password).then(isMatch => {
        if(!isMatch) {
            throw new Error();
        }
        return foundUser;
      });
     
      return user;
    });   
    return user;
}