const router = require('express').Router()
const AgencyController = require('../controllers/agencyController')

router.post('/register', AgencyController.registerAgency)
router.post('/login', AgencyController.loginAgecy)
router.get('/', AgencyController.getAllAgencies)
router.get('/:id', AgencyController.getAgencyById)
router.put('/:id', AgencyController.updateDataAgency)
router.delete('/:id', AgencyController.deleteById)

module.exports = router