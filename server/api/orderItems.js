const router = require('express').Router()
const {OrderItems} = require('../db/models')

router.get('/', (req, res, next) => {
  OrderItems.findAll()
    .then(orderItems => res.send(orderItems))
    .catch(next)
})

module.exports = router
