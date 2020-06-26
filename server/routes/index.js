const router = require('express').Router()
const parentRoute = require('./parent')
const nannyRoute = require('./nanny')
const agencyRoute = require('./agency')
const childRoute = require('./child')

router.use('/parent', parentRoute)
router.use('/nanny', nannyRoute)
router.use('/agency', agencyRoute)
router.use('/child', childRoute)
module.exports = router
