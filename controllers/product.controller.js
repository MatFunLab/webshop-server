const { validationResult } = require('express-validator/check');

const productService = require('../services/product.service');

exports.addCategory = (req, res) => {
  const name = req.body.name;
 
  productService.addCategory(name).then((addedCategory) => {
    res.send(addedCategory);
  }).catch(err => {
    res.status(500).send(err);
   });
}

//RADI
exports.addProduct = (req, res) => {
  const name = req.body.name;
  const price = req.body.price;
  const image = req.file;
  const desc = req.body.desc;
  const userId = req.body.userId;
  const categoryId = req.body.categoryId;
 
  //check if image is uploaded correctly
  if(!image) {
    return res.status(422).send({failure: -2, message:"Error uploading image"});
    }
   //validation errors from admin.js 
   const validationErrors = validationResult(req);
   console.log("------------------------",validationErrors);
   if(!validationErrors.isEmpty()) {
     return res.status(422).send({failure: -1, message:"Invalid value(s)"});
   }
   const imageUrl = image.path;
 
   productService.addProduct(name, price, imageUrl, desc, userId, categoryId).then(addedProduct => {
    res.send(addedProduct);
   })
   .catch(err => {
    res.status(500).send(err);
   });
}


exports.getProducts = (req, res) => {
  if(req.query) {
    const page = req.query.page;
    productService.getProducts(page).then((products) => {
      res.send(products);
    }).catch((err)=> {
      console.log(err);
      res.status(500).send(err);
    });   
  } else {
    productService.getProducts().then((products) => {
      res.send(products);
    }).catch((err)=> {
      console.log(err);
      res.status(500).send(err);
    });   
  }
 
  }

exports.getOneProduct = (req, res) => {

 productService.getOneProduct(req.params.id).then(product => {
   res.send(product);
 }).catch(err => {
  res.status(500).send(err);
 });
}


exports.deleteProduct = (req, res) => {
  const id = req.body.id;
  /* const name = req.body.name;
  const price = req.body.price;
  const image = req.file;
  const desc = req.body.desc;
  
  const imageUrl =image.path; */

  productService.deleteProduct(id).then(deletedProduct => {
    res.send(deletedProduct);
  }).catch(err => {
    res.status(500).send(err);
  });
}


exports.updateProduct = (req, res) => {
  const id = parseInt(req.body.id, 10);
  const name = req.body.name;
  const price = req.body.price;
  const image = req.file;
  const desc = req.body.desc;

   //validation errors from admin.js 
   const validationErrors = validationResult(req);
   if(!validationErrors.isEmpty()) {
     return res.status(422).send({failure: -1, message:"Invalid value(s)"});
   }
   const imageUrl = image.path;
   console.log("-----imageurl: ", imageUrl);
 productService.updateProduct(id, name, price, imageUrl, desc).then(updatedProduct => {
   res.send(updatedProduct);
 }).catch(err => {
   res.status(500).send();
 });
}




// external services
let topSelledProducts = null; //to store top selled products that can be passed to getProductSalesInfoFromServer controller that sends data to client
exports.getProductSalesInfoFromCron = (req, res, next) => {
  console.log('------top products', topSelledProducts)
   topSelledProducts = req.body;
   res.status(200).send();  
   
}

exports.getProductSalesInfoFromServer = (req, res) => {
    res.send(topSelledProducts);
}