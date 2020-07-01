const { NannyWishlist, Nanny, Agency } = require("../models");

class WishlistController {
  static getAllWishList(req, res, next) {
    const ParentId = req.parentData.id;
    NannyWishlist.findAll({
      where: { ParentId },
      include: [{ model: Agency, attributes: ["email"] }],
    })
      .then((wishlists) => {
        res.status(200).json(wishlists);
      })
      .catch((err) => {
        next(err);
      });
  }

  static addToWishlist(req, res, next) {
    const ParentId = req.parentData.id;
    const id = req.params.nannyId;
    Nanny.findOne({ where: { id } })
      .then((nanny) => {
        const nannyWishlist = { ...nanny.dataValues, ParentId };
        return NannyWishlist.create(nannyWishlist);
      })
      .then((wish) => {
        res.status(201).json(wish);
      })
      .catch((err) => {
        next(err);
      });
  }

  static deleteWishlist(req, res, next) {
    const id = req.params.id;
    NannyWishlist.destroy({ where: { id } })
      .then(() => {
        res.status(200).json({ message: "Delete wishlist success" });
      })
      .catch((err) => {
        next(err);
      });
  }
}

module.exports = WishlistController;
