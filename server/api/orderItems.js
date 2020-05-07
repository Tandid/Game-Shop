const router = require('express').Router()
const {OrderItems} = require('../db/models')

router.get('/', (req, res, next) => {
  OrderItems.findAll()
    .then(orderItems => res.send(orderItems))
    .catch(next)
})

// router.get('/:orderId', (req, res, next) => {
//   OrderItems.findAll({where: {status: 'cart'}})
//     .then((orderItems) => res.send(orderItems))
//     .catch(next)
// })

module.exports = router
