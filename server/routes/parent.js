const router = require("express").Router();
const parentController = require("../controllers/parentController");
const { authenticationParent } = require("../middlewares/authentication");
const { authorizationUpdateParent } = require("../middlewares/authorization");

router.post("/register", parentController.registerParent);
router.post("/login", parentController.loginParent);
router.get("/", parentController.getAllParents);
router.get("/:id", parentController.getParentById);
router.use(authenticationParent);
router.get("/allchildren", parentController.getAllChildren);

router.put(
  "/:id",
  authorizationUpdateParent,
  parentController.updateDataParent
);
router.delete("/:id", authorizationUpdateParent, parentController.deleteById);

module.exports = router;
