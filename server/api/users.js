const router = require('express').Router()
const {User} = require('../db/models')
const {isAdmin, isCurrentUser} = require('./security.js')

module.exports = router

router.get('/', isAdmin, async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      // attributes: ['id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  await User.findByPk(req.params.id)
    .then(user => res.send(user))
    .catch(next)
})

router.post('/', async (req, res, next) => {
  await User.create(req.body)
    .then(user => res.send(user))
    .catch(next)
})

router.put('/:id', (req, res, next) => {
  User.findByPk(req.params.id)
    .then(user =>
      user.update({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        imageURL: req.body.imageURL,
        ...user
        // price: req.body.price,
        // inventory: req.body.inventory,
        // category: req.body.category
      })
    )
    .then(user => res.send(user))
    .catch(next)
})
