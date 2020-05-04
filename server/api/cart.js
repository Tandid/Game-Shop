const router = require('express').Router()
const {OrderItems} = require('../db/models')

router.get('/', (req, res, next) => {
  OrderItems.findOne({where: {status: 'active-cart'}}).then(cart =>
    res.send(cart)
  )
})

// router.put('/:id', (req, res, next) => {
//   Order.findByPk(req.params.id).then((cart) => cart.update({}))
// })

module.exports = router
