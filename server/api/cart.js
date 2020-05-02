const router = require('express').Router()
const {Order} = require('../db/models')

router.get('/', async (req, res, next) => {
  await Order.findAll()
  console
    .log('cart-------')
    .then(products => res.send(products))
    .catch(next)
})

module.exports = router

// router.get("/", (req, res, next) => {
//     Order.findOne({where: {completed: false}})
// })
