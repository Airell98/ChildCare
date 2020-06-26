const router = require('express').Router()
const ChildController = require('../controllers/childController')

router.get('/', ChildController.getAllChildren)
router.post('/', ChildController.addChild)
router.get('/:id', ChildController.getChildById)
router.put('/:id', ChildController.updateDataChild)
router.delete('/:id', ChildController.deleteById)

module.exports = router