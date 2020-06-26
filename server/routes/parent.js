const router = require('express').Router()
const parentController = require('../controllers/parentController')

router.post("/register", parentController.registerParent)
router.post("/login", parentController.loginParent)
router.get('/', parentController.getAllParents)
router.get('/:id', parentController.getParentById)
router.put('/:id', parentController.updateDataParent)
router.delete('/:id', parentController.deleteById)

module.exports = router