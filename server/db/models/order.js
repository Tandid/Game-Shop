const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  completed: {
    defaultValue: false,
    type: Sequelize.BOOLEAN,
    allowNull: false
  }
})

module.export = Order
