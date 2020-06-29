const router = require('express').Router()
const parentRoute = require('./parent')
const nannyRoute = require('./nanny')
const agencyRoute = require('./agency')
const childRoute = require('./child')
const wishlistRoute = require('./wishlist')
const messageRoute = require('./message')
const emailingRoute = require('./emailing')

router.use('/parent', parentRoute)
router.use('/nanny', nannyRoute)
router.use('/agency', agencyRoute)
router.use('/child', childRoute)
router.use('/wishlist', wishlistRoute)
router.use('/message', messageRoute)
router.use('/emailing', emailingRoute)

module.exports = router
