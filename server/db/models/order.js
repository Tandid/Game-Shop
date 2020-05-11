const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  // items: {
  //   type: Sequelize.ARRAY(Sequelize.TEXT),
  // },
  status: {
    type: Sequelize.STRING,
    defaultValue: 'cart'
  }
})

module.exports = Order
