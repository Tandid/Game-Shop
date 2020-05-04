const router = require('express').Router()
const {Category} = require('../db/models')

router.get('/', async (req, res, next) => {
  await Category.findAll()
    .then(categories => res.send(categories))
    .catch(next)
})

router.get('/:id', async (req, res, next) => {
  await Category.findAll({where: {id: req.params.id}})
    .then(category => res.send(category))
    .catch(next)
})

module.exports = router
