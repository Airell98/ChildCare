const router = require('express').Router()
const NannyController = require('../controllers/nannyController')
const { authenticationAgency, authenticationParent } = require('../middlewares/authentication')
const { authorizationAgency } = require('../middlewares/authorization')

router.post('/register', NannyController.registerNanny)
router.get('/', NannyController.getAllNannies)
router.get('/:id', NannyController.getNannyById)


router.put('/wishlist/:id', authenticationParent, NannyController.addToWishList)

router.use(authenticationAgency)
router.post('/', NannyController.addNanny)

router.put('/:id', authorizationAgency, NannyController.updateDataNanny)
router.delete('/:id', authorizationAgency, NannyController.deleteById)

module.exports = router