const router = require('express').Router()
const NannyController = require('../controllers/nannyController')

router.get('/', NannyController.getAllNannies)
router.post('/', NannyController.addNanny)
router.get('/:id', NannyController.getNannyById)
router.put('/:id', NannyController.updateDataNanny)
router.delete('/:id', NannyController.deleteById)

module.exports = router