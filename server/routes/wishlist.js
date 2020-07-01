const router = require("express").Router();
const WishlistController = require("../controllers/wishlistController");

const { authenticationParent } = require("../middlewares/authentication");
const { wishlistAuth } = require("../middlewares/authorization");

router.use(authenticationParent);
router.get("/", WishlistController.getAllWishList);
router.post("/add/:nannyId", WishlistController.addToWishlist);
router.delete("/delete/:id", wishlistAuth, WishlistController.deleteWishlist);

module.exports = router;
