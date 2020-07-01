const router = require("express").Router();
const NannyController = require("../controllers/nannyController");
const {
  authenticationAgency,
  authenticationParent,
} = require("../middlewares/authentication");
const { authorizationAgency } = require("../middlewares/authorization");

router.post("/register", NannyController.registerNanny);
router.get("/", NannyController.getAllNannies);
router.get("/kanan/:id", NannyController.getAllNanniesToTheRight);
router.get("/kiri/:id", NannyController.getAllNanniesToTheLeft);
router.get(
  "/showAssociateNanny",
  authenticationAgency,
  NannyController.findAllCorrespondingNanny
);
router.get("/:id", NannyController.getNannyById);

router.use(authenticationAgency);
router.post("/", NannyController.addNanny);

router.put("/:id", authorizationAgency, NannyController.updateDataNanny);
router.delete("/:id", authorizationAgency, NannyController.deleteById);
router.put(
  "/avail/:id",
  authorizationAgency,
  NannyController.updateAvailStatusNanny
); // endpoint saat ortu setuju stlh video call kemudian agency memilih utk setuju

module.exports = router;
