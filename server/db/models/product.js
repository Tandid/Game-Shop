const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },

  description: {
    type: Sequelize.STRING,
    allowNull: false
  },

  imageURL: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultvalue: 'https://img.icons8.com/cotton/2x/controller.png'
  },

  price: {
    type: Sequelize.DECIMAL,
    allowNull: false
  },

  inventory: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
})

module.exports = Product
