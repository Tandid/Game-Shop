const router = require('express').Router()
const {OrderItems} = require('../db/models')

router.get('/', async (req, res, next) => {
  await OrderItems.findAll()
    .then(orderItems => res.send(orderItems))
    .catch(next)
})

router.get('/:id', (req, res, next) => {
  OrderItems.findByPk(req.params.id)
    .then(orderItem => res.send(orderItem))
    .catch(next)
})

router.post('/', (req, res, next) => {
  OrderItems.create(req.body)
    .then(orderItem => res.status(201).send(orderItem))
    .catch(next)
})

router.put('/:id', (req, res, next) => {
  OrderItems.findByPk(req.params.id)
    .then(orderItem => orderItem.update({inventory: req.body.inventory}))
    .then(orderItem => res.send(orderItem))
    .catch(next)
})

module.exports = router
