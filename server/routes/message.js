const router = require('express').Router()
const { authenticationAgency, authenticationParent } = require('../middlewares/authentication')
const MessageController = require('../controllers/messageController')

router.get('/agency/', authenticationAgency, MessageController.getAllMsgAgency)
router.get('/parent', authenticationParent, MessageController.getAllMsgParent)
router.get('/agency/:ParentId', authenticationAgency, MessageController.getMsgAgency)
router.get('/parent/:AgencyId', authenticationParent, MessageController.getMsgParent)

router.post('/agency/:ParentId', authenticationAgency, MessageController.postMsgAgency)
router.post('/parent/:AgencyId', authenticationParent, MessageController.postMsgParent)

module.exports = router