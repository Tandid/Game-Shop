const router = require('express').Router()
const {Order} = require('../db/models')

router.get('/', (req, res, next) => {
  Order.findAll({where: {status: 'completed'}})
    .then(orders => res.send(orders))
    .catch(next)
})

module.exports = router
