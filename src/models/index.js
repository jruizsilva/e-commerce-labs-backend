const { Sequelize } = require('sequelize')

const modelProduct = require('./Product.js')
const modelUser = require('./User.js')
const modelOrder = require('./Order.js')
const modelCart = require('./Cart.js')
const modelCategory = require('./Category.js')
const modelFeedback = require('./Feedback.js')
const modelNotification = require('./Notification.js')
const modelQuestion = require('./Question.js')
const modelAnswer = require('./Answer.js')
const modelProductCart = require('./ProductCart.js')
const modelOrderDetail = require('./OrderDetail.js')

const sequelize =
  process.env.NODE_ENV === 'production'
    ? new Sequelize(process.env.DATABASE_URL, {
        dialectOptions: {
          ssl: {
            require: true
          }
        },
        dialect: 'postgres'
      })
    : new Sequelize({
        database: 'ecommerce',
        host: 'localhost',
        password: 'admin',
        username: 'postgres',
        port: 5432,
        dialect: 'postgres',
        logging: false
      })

const Product = modelProduct(sequelize)
const Category = modelCategory(sequelize)
const User = modelUser(sequelize)
const Order = modelOrder(sequelize)
const Cart = modelCart(sequelize)
const Feedback = modelFeedback(sequelize)
const Notification = modelNotification(sequelize)
const Question = modelQuestion(sequelize)
const Answer = modelAnswer(sequelize)
const ProductCart = modelProductCart(sequelize)
const OrderDetail = modelOrderDetail(sequelize)

//aca hacemos nuestras relaciones
Category.belongsToMany(Product, { through: 'product_category' })
Product.belongsToMany(Category, { through: 'product_category' })
Product.belongsToMany(User, { through: 'favorite' })
User.belongsToMany(Product, { through: 'favorite' })
Question.hasMany(Answer)
Answer.belongsTo(Question)
User.hasMany(Question)
Question.belongsTo(User)
Product.hasMany(Question)
Question.belongsTo(Product)
Notification.belongsTo(User)
User.hasMany(Notification)
Notification.belongsTo(Product)
Product.hasMany(Notification)
Cart.hasOne(User)
User.belongsTo(Cart)
Cart.hasMany(ProductCart)
ProductCart.belongsTo(Cart)
Product.hasMany(ProductCart)
ProductCart.belongsTo(Product)
User.hasMany(Product)
Product.belongsTo(User)
User.hasMany(Order)
Order.belongsTo(User)
//////
Order.belongsToMany(Product, { through: OrderDetail })
Product.belongsToMany(Order, { through: OrderDetail })

module.exports = {
  conn: sequelize,
  Product,
  Category,
  User,
  Order,
  Cart,
  Feedback,
  Notification,
  Question,
  Answer,
  ProductCart,
  OrderDetail
}
