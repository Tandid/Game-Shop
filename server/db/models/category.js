const Sequelize = require('sequelize')
const db = require('../db')

const Category = db.define('category', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },

  imageURL: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: 'https://img.icons8.com/cotton/2x/controller.png'
  }
})

module.exports = Category
