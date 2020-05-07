const router = require('express').Router()
const {OrderItems} = require('../db/models')

router.get('/', async (req, res, next) => {
  await OrderItems.findAll()
    .then(orderItems => res.send(orderItems))
    .catch(next)
})

module.exports = router
