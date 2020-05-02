const router = require('express').Router()
const {Product} = require('../db/models')

// /api/products
// router.get('/', async (req, res, next) => {
//   try {
//     const products = await Product.findAll()
//     res.json(products)
//   } catch (err) {
//     next(err)
//   }
// })

router.get('/', async (req, res, next) => {
  await Product.findAll().then(products => res.send(products).catch(next))
})

router.get('/:id', async (req, res, next) => {
  await Product.findAll({where: {id: req.params.id}})
    .then(product => res.send(product))
    .catch(next)
})

router.post('/', async (req, res, next) => {
  await Product.create(req.body)
    .then(product => res.send(product))
    .catch(next)
})

router.delete('/:id', async (req, res, next) => {
  await Product.findByPk(req.params.id)
    .then(product => product.destroy(req.params.id))
    .catch(next)
})

router.put('/:id', async (req, res, next) => {
  await Product.findByPk(req.params.id)
    .then(product => product.update(req.body))
    .catch(next)
})

module.exports = router
