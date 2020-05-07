const router = require('express').Router()
const {Order, User} = require('../db/models')

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

module.exports = router
