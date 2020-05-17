const router = require('express').Router()
module.exports = router

// api routes:
router.use('/users', require('./users'))
router.use('/products', require('./products'))
router.use('/orders', require('./orders'))
router.use('/orderItems', require('./orderItems'))
router.use('/reviews', require('./reviews'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
