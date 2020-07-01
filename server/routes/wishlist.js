const router = require('express').Router()
const NannyController = require('../controllers/nannyController')
const { authenticationParent, authenticationAgency } = require('../middlewares/authentication')
const { authorizationParent } = require('../middlewares/authorization')


router.get('/', authenticationParent, NannyController.getAllWishlist ) // melihat list wishlist parent utk nanny yg sudah dipilih
router.put('/:nannyId', authenticationParent, NannyController.addToWishList) // memasukkan nanny yg dipilih ke dlm wishlist utk diwawancara

router.put('/remove/:nannyId', authenticationAgency, NannyController.removeWishList) // untuk parent setuju namun kemudain agency tidak setuju kirim nanny


module.exports = router