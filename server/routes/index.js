const router = require('express').Router()
const parentRoute = require('./parent')
const nannyRoute = require('./nanny')
const agencyRoute = require('./agency')
const childRoute = require('./child')
const wishlistRoute = require('./wishlist')
const messageRoute = require('./message')

router.use('/parent', parentRoute)
router.use('/nanny', nannyRoute)
router.use('/agency', agencyRoute)
router.use('/child', childRoute)
router.use('/wishlist', wishlistRoute)
router.use('/message', messageRoute)

module.exports = router
