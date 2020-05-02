const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  items: {
    type: Sequelize.ARRAY(Sequelize.TEXT),
    defaultValue: []
  },
  status: {
    type: Sequelize.STRING,
    defaultValue: 'cart'
  },
  completed: {
    defaultValue: false,
    type: Sequelize.BOOLEAN,
    allowNull: false
  }
})

module.exports = Order
