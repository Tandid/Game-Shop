const router = require('express').Router()
const {Review} = require('../db/models')

router.get('/', (req, res, next) => {
  Review.findAll()
    .then(reviews => res.send(reviews))
    .catch(next)
})

router.get('/:id', async (req, res, next) => {
  await Review.findAll({where: {productId: req.params.id}})
    .then(reviews => res.send(reviews))
    .catch(next)
})

router.post('/', (req, res, next) => {
  Review.create(req.body)
    .then(review => res.status(201).send(review))
    .catch(next)
})

module.exports = router
