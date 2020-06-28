const router = require('express').Router()
const { authenticationAgency, authenticationParent } = require('../middlewares/authentication')
const MessageController = require('../controllers/messageController')

router.get('/agency/', authenticationAgency, MessageController.getAllMsgAgency) // liat semua list messages masuk sisi agency
router.get('/parent', authenticationParent, MessageController.getAllMsgParent) // lihat semua list messages masuk sisi parent
router.get('/agency/:ParentId', authenticationAgency, MessageController.getMsgAgency) // isi semua chat dari sisi parent
router.get('/parent/:AgencyId', authenticationParent, MessageController.getMsgParent) // isi semua chat dari sisi agency

router.post('/agency/:ParentId', authenticationAgency, MessageController.postMsgAgency) // post message dr sisi agency
router.post('/parent/:AgencyId', authenticationParent, MessageController.postMsgParent) // post message dr sisi parent

module.exports = router