const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  status: {
    type: Sequelize.STRING,
    defaultValue: 'cart'
  },
  totalPrice: {
    type: Sequelize.DECIMAL,
    defaultValue: 0
  }
})

module.exports = Order
