const Product = require('../models/product.model');
const Category = require('../models/category.model');
const fileHelper = require('../utils/file-util');

exports.addCategory = (name) => {
    const result = Category.create({
        name: name
      }).then((addedCategory) => {
          if(!addedCategory) {
            throw new Error();
          }
        return addedCategory;
      });
    
      return result;
}

exports.getCategories = () => {
    const result = Category.findAll().then(categories => {
        if(!categories) {
            throw new Error();
        }
       return categories;
      });
      return result;
}

exports.addProduct = (name, price, imageUrl, desc, userId, categoryId) => {

    const result = Product.create({
        name: name,
        price: price,
        imageUrl: imageUrl,
        desc: desc,
        userId: userId,
        categoryId: categoryId
      }).then((addedProduct) => {
          if(!addedProduct) {
            throw new Error();
          }
        return addedProduct;
      });
    
      return result;
}

exports.getProducts = (page) => {
   
    if(page === undefined) {
        const result = Product.findAll({include: [Category]}).then(products => {
            if(!products) {
                throw new Error();
            }
           return products;
          });
          return result;
    } else {
        const ROWS_PER = 25;
        const OFFSET = ROWS_PER * (page -1);
        const result = Product.findAll({
            limit: ROWS_PER,
            offset: OFFSET,
            include: [Category]
        }).then(products => {
            if(!products) {
                throw new Error();
            }
           return products;
          });
          return result;
    }  
}

exports.getOneProduct = (id) => {
    const result = Product.findByPk(id).then(product => {
        if(!product) {
            throw new Error();
        }
        return product;
      });
      return result;
}

exports.deleteProduct = (id) => {
    const result = Product.findByPk(id).then(product => {
        if(product) {
          fileHelper.deleteFile(product.imageUrl);
          return product.destroy();
        } else { 
            return new Promise((undefined, reject) => {
                reject("product with that ID not found");
            })
        }
      }).then(deletedProduct => {
        if(!deletedProduct) {
            throw new Error();
        }
        return deletedProduct;
      });

      return result;    
}

exports.updateProduct = function (id, name, price, imageUrl, desc)  {
   
    const result =  Product.findByPk(id).then(product => {
       
        if(!product) {
            return new Promise((undefined, reject) => {
                reject("product with that ID not updated");
            });
        }
            if(!name) {
                product.name = product._previousDataValues.name;
            } else {
                product.name = name;
            }
            if(!price) {
                product.price = product._previousDataValues.price;
            } else {
                product.price = price;
            }
            if(!imageUrl) {
                product.imageUrl = product._previousDataValues.imageUrl;
            } else {
                fileHelper.deleteFile(product.imageUrl);
                product.imageUrl = imageUrl;
            }
            if(!desc) {
                product.desc = product._previousDataValues.desc;
            } else {
                product.desc = desc;
            }
        
        return product.save();
      }).then(updatedProduct => {
        if(!updatedProduct) {
            throw new Error();
        }
        return updatedProduct;
      });

      return result;
}

