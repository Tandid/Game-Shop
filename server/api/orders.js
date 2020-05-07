const router = require('express').Router()
const {Order, OrderItems} = require('../db/models')

router.get('/', (req, res, next) => {
  Order.findAll()
    .then(orders => res.send(orders))
    .catch(next)
})

router.get('/:id', (req, res, next) => {
  Order.findByPk(req.params.id)
    .then(orders => res.send(orders))
    .catch(next)
})

router.get('/:id/orderItems', (req, res, next) => {
  OrderItems.findAll({
    where: {orderId: req.params.id}
  })
    .then(orderItems => res.send(orderItems))
    .catch(next)
})

router.get('/:id/orderItems/:productId', (req, res, next) => {
  OrderItems.findAll({
    where: {orderId: req.params.id, productId: req.params.productId}
  })
    .then(orderItems => res.send(orderItems))
    .catch(next)
})

router.put('/:id/orderItems/:productId', (req, res, next) => {
  OrderItems.findOne({
    where: {orderId: req.params.id, productId: req.params.productId}
  })
    .then(orderItem => orderItem.update({inventory: req.body.inventory}))
    .then(orderItem => res.send(orderItem))
    .catch(next)
})

router.delete('/:id/orderItems/:productId', async (req, res, next) => {
  try {
    const orderItem = await OrderItems.findOne({
      where: {orderId: req.params.id, productId: req.params.productId}
    })
    await orderItem.destroy()
    res.sendStatus(204)
  } catch (error) {
    next(error)
  }
})

module.exports = router
