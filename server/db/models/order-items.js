const Sequelize = require('sequelize')
const db = require('../db')

const OrderItems = db.define('orderItems', {
  items: {
    type: Sequelize.ARRAY(Sequelize.TEXT),
    defaultValue: []
  },
  status: {
    type: Sequelize.STRING,
    defaultValue: 'active-cart'
  },
  completed: {
    defaultValue: false,
    type: Sequelize.BOOLEAN,
    allowNull: false
  }
})

module.exports = OrderItems
