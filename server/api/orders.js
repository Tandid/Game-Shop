const router = require('express').Router()
const {Order, OrderItems} = require('../db/models')

// router.get('/', (req, res, next) => {
//   Order.findAll({where: {status: 'completed'}})
//     .then((orders) => res.send(orders))
//     .catch(next)
// })

router.get('/:userId', (req, res, next) => {
  Order.findAll({where: {userId: req.params.userId}})
    .then(orders => res.send(orders))
    .catch(next)
})

router.get('/:userId/:id', (req, res, next) => {
  Order.findByPk(req.params.id)
    .then(orders => res.send(orders))
    .catch(next)
})

router.get('/:userId/:id/orderItems', (req, res, next) => {
  OrderItems.findAll({
    where: {orderId: req.params.id}
  })
    .then(orderItems => res.send(orderItems))
    .catch(next)
})

router.get('/:userId/:id/orderItems/:productId', (req, res, next) => {
  OrderItems.findAll({
    where: {orderId: req.params.id, productId: req.params.productId}
  })
    .then(orderItems => res.send(orderItems))
    .catch(next)
})

module.exports = router
