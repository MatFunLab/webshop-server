const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
Token = require('../models/token.model');


const auth =  (req, res, next) => {
     
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
   
     const decode = jwt.verify(token, "krk");
   
     User.findByPk(decode.id).then(userFound => {
      if(!userFound) {
       throw new Error();
      }
      //setting token and user field and assigning to token received from client for later usage in controller
      req.token = token;
      req.user = userFound;
      next();
     }).catch(err => {
       res.status(401).send(err);
     })


     /* Token.find(
       { where: { id: decode.id }, include: [{model: User}] }
     ).then(foundUser => {
       console.log("objecttttt-----------",foundUser);
       req.user = foundUser; 
     }).catch(err => {
       console.log(err);
     });
*/
    
 } catch(e) {
   res.status(401).send();
 }
  }
 



module.exports = auth;
