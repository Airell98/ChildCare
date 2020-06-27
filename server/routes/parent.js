const route = require('express').Router()
const parentController = require('../controllers/parentController')

route.post("/register", parentController.registerParent)
route.post("/login", parentController.loginParent)

module.exports = route