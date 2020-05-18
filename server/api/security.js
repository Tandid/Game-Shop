const isLoggedIn = (req, res, next) => {
  if (req.user) return next()
  return res.sendStatus(401)
}

const isAdmin = (req, res, next) => {
  if (req.user && req.user.admin === true) return next()
  return res.sendStatus(401)
}

const isCurrentUser = (req, res, next) => {
  if (req.user && (req.user.admin === true || req.user.id == req.params.id))
    return next()
  return res.sendStatus(401)
}

module.exports = {
  isAdmin,
  isLoggedIn,
  isCurrentUser
}
