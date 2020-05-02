const Sequelize = require('sequelize')
const db = require('../db')

const Cart = db.define('order', {})

module.export = Cart
