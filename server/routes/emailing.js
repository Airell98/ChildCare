const router = require("express").Router();
const { authenticationParent } = require("../middlewares/authentication");
const EmailingController = require("../controllers/emailingController");

//parent ngirim proposal ke agency, agency respon accept atau tidak
router.get(
  "/parent/:nannyId",
  authenticationParent,
  EmailingController.sendHiringNannyProposal
);
router.post("/agency/accept", EmailingController.agencyAcceptProposal);
router.post("/agency/refuse", EmailingController.agencyRefuseProposal);

module.exports = router;
