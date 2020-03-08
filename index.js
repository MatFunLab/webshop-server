const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./utils/db-util');
const multer = require('multer');
const path = require('path');
const errorController = require('./controllers/error-pages.controller');
const cors = require('cors'); 
const helmet = require('helmet');

const app = express();

app.use(helmet.hidePoweredBy({ setTo: 'PHP 4.2.0' }));

const loginRoutes = require('./routes/login');
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

const Product = require("./models/product.model");
const Category = require("./models/category.model");
const User = require("./models/user.model");
const Role = require('./models/role.model');
const Bag = require('./models/bag.model');
const Order = require('./models/order.model');
const OrderItem = require('./models/order-item.model');
const Token = require('./models/token.model');

let PORT = process.env.PORT || 3000;

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images');
    },
    filename: (req, file, cb) => {
        cb(null, new Date().getTime().toString() + '-' + file.originalname); 
    }
});
const imageFilter = (req, file, cb) => {
    if(file.mimetype === '/image/png' || file.mimetype === '/image/jpg' || file.mimetype === '/image/jpeg') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}
app.use(cors({origin: [
    "http://localhost:4200", "http://localhost:3001", "http://localhost:4201" //TODO promijeniti kod deploya
  ]}));




// to serve images statically - point img src in frontend to e.g. "http://localhost:3000/images/<path_to_image>"
app.use("/images", express.static(path.join(__dirname, 'images'))); 
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(multer({storage: fileStorage, filefilter: imageFilter}).single('file'));



//routes
app.use(loginRoutes);
app.use(adminRoutes);
app.use(shopRoutes);
app.use(errorController.get404);

//db model connections
User.hasOne(Bag);
Bag.belongsTo(User);
User.hasMany(Token);
Role.hasMany(User);
User.belongsTo(Role);
Bag.hasMany(OrderItem);
User.hasMany(Order);
OrderItem.belongsTo(Bag);
OrderItem.belongsTo(Product);
Category.hasMany(Product);
Product.belongsTo(Category);
Order.belongsToMany(Product, { through: OrderItem });
Product.belongsToMany(Bag, { through: OrderItem });

//<force: true> on the fresh start of the app to start with empty tables
/* sequelize.sync({force: true}).then(() => { */
 sequelize.sync().then(() => {
   Role.create({name: "admin"}).then(success => {console.log("Role admin succesfully created")}).catch(err => {console.log(err)});
   Role.create({name: "user"}).then(success => {console.log("Role user succesfully created")}).catch(err => {console.log(err)});
  
}).catch((err) => {
    console.log("ERROR CREATING TABLES : ", err);
});

app.listen(3000, () => {
    console.log(`Server is up at ${PORT}`);
});
