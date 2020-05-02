const router = require('express').Router()
const {Order} = require('../db/models')

router.get('/', (req, res, next) => {
  Order.findOne({where: {status: 'cart'}}).then(cart => res.send(cart))
})

// router.put('/:id', (req, res, next) => {
//   Order.findByPk(req.params.id).then((cart) => cart.update({}))
// })

module.exports = router
