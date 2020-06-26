const router = require('express').Router()
const NannyController = require('../controllers/nannyController')
const { authenticationAgency } = require('../middlewares/authentication')
const { authorizationAgency } = require('../middlewares/authorization')

router.get('/', NannyController.getAllNannies)
router.post('/register', NannyController.registerNanny)
router.get('/:id', NannyController.getNannyById)
router.use(authenticationAgency)
router.post('/', NannyController.addNanny)

router.put('/:id', authorizationAgency, NannyController.updateDataNanny)
router.delete('/:id', authorizationAgency, NannyController.deleteById)

module.exports = router