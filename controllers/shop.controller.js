const shopService = require('../services/shop.service');
const cartService = require('../services/cart.service');
const productService = require('../services/product.service');

//RADI
exports.getCart = (req, res) => {
    loggedUserId = req.user.id;
    
     cartService.getBag(loggedUserId, 0).then(itemsInBag => {
       res.send(itemsInBag);
    }).catch(err => {
        res.status(500).send(err);
    }); 
}

exports.getCategories = (req, res) => {
    productService.getCategories().then(categories => { 
        res.send(categories);
    }).catch(err => {
        res.status(500).send(err);
    })
}

//radi
exports.addToCart = (req, res) => {
   const userId = req.user.id;
   const quantity =  req.body.quantity;
   const productId = req.body.id;
   
    cartService.getBag(userId, 0).then(cart => {
        console.log('---------------------------cart : ', cart);
        if(cart === -1) {
            cartService.createBag(userId).then(createdCart => {
                
                cartService.addToBag(createdCart.id, productId, quantity).then(createdItem => {
                    res.send(createdItem);
                }).catch(err => {
                  
                    res.status(500).send(err);
                });
                console.log("new cart created");
            }).catch(err => {
               
                res.status(500).send(err);
            });
        } else {
            console.log('---------------------BAGID: ',cart[0].dataValues.bagId)
            cartService.addToBag(cart[0].dataValues.bagId, productId, quantity).then(addedItem => {
                res.send(addedItem);
            }).catch(err => {
               
                res.status(500).send(err);
            });
        }
    });
  }
  
  //radi
  exports.deleteFromCart = (req, res) => {
      const bagId = req.body.bagId;
      const productId = req.body.productId;
    cartService.deleteItemFromBag(bagId, productId).then(cartItem => {
        res.send(cartItem); 
    }).catch(err => {
        res.status(500).send(err);
    });
    
    }
  
    //radi
  exports.updateItemInCart = (req, res) => {

      const bagId = req.body.bagId;
      const itemId = req.body.id;
      const quantity =  req.body.quantity;
    
    cartService.updateBag(bagId, itemId, quantity).then(updatedBagItem => {
        res.send(updatedBagItem);
    }).catch(err => {
        res.status(500).send(err);
    });
  
  }
  
  
exports.getInvoice = (req, res) => {
   
    shopService.generateInvoice(req, res);
    
}

exports.getCheckout = (req, res) => {
    cartId = res.body.cartId;
    userId = req.user.id;
    
    cartService.updateBag(cartId, null, null).then(completedCart => { 
        console.log('Cart is completed. Proceeded to checkout')
        
    }).catch(err => {
        res.status(500).send(err);
    }); 
}

/* exports.getProducts = (req, res) => {
    productService.getProducts(req.query.page).then(products =>{
        res.send(products);
    }).catch(err => {
        res.status(500).send(err);
    }); 
    
} */

