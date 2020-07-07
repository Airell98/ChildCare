const router = require('express').Router()
const ChildController = require('../controllers/childController')
const { authenticationParent } = require('../middlewares/authentication')
const { authorizationParent } = require('../middlewares/authorization')

router.get('/', ChildController.getAllChildren)
// router.get('/:id', ChildController.getChildById)

router.use(authenticationParent)
router.post('/', ChildController.addChild)
// router.put('/:id', authorizationParent, ChildController.updateDataChild)
// router.delete('/:id', authorizationParent, ChildController.deleteById)

module.exports = router