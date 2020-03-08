const Bag = require('../models/bag.model');
const OrderItem = require('../models/order-item.model');
const Product = require('../models/product.model');

const db = require('../utils/db-util');

exports.getBag = (userId, isComplete) => {

    const result = Bag.findOne({where: {
        userId: userId,
        completed: isComplete
    }
      }).then(bag => {
          if(!bag) {
           return -1;
          }
        //find all items of specific user in bag  
         const oi =  OrderItem.findAll({
              where: {
                  bagId: bag.dataValues.id
              }, include: [Product, Bag] //to get nested json
            
          }).then(orderItems => {
              if(!orderItems) {
                  return -1;
              }
            return orderItems;
          }); 
            return new Promise((resolve) => {
             resolve(oi); 
            })
      }).catch(err => {return err;});
      return result;
}


exports.createBag = (userId) => {

    const result = Bag.create({
        userId: userId,
        completed: 0
      }).then(createdBag => {
          if(!createdBag) {
            throw new Error();
          }
        return createdBag;
      });
    
      return result;
}

exports.addToBag = (bagId, productId, quantity ) => {
  
    const result = OrderItem.create({
        bagId: bagId,
        quantity: quantity,
        productId: productId
    }).then(orderItem => {
        if(!orderItem) {
            throw new Error();
        }
       return orderItem;
      });
      return result;
}

exports.updateBag = (bagId, id, quantity) => {
   
   if(quantity === null) {
       Bag.findOne({where: {id: id }}).then(bag => { 
        bag.completed = 1;
        return bag.save();
    }).catch(err => {
           throw new Error(err);
       });
      
   } else {
      
      const updatedItem =  OrderItem.findOne({where: {id: id, bagId: bagId }}).then(bagItem => {
          
           if(!quantity) {
            bagItem.quantity = _previousDataValues.quantity;
           } else {
            bagItem.quantity = quantity;
           }
          /*  if(!productId) {
               bagItem.productId = _previousDataValues.productId;
           } else {
               bagItem.productId = productId;
           } */
          return bagItem.save();
       }).catch(err => {
           throw new Error(err);
       });
      return updatedItem;
   }
}

exports.deleteItemFromBag = (bagId, productId) => {
    const result = OrderItem.findOne({ where: {bagId: bagId, productId: productId} }).then(bagItem => {
        if(bagItem) {
          return bagItem.destroy();
        } else { 
            return new Promise((undefined, reject) => {
                reject("bagItem not deleted");
            })
        }
      }).then(deletedBagItem => {
        if(!deletedBagItem) {
            throw new Error();
        }
        return deletedBagItem;
      });

      return result;    
}

