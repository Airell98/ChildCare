const { Nanny, Agency, Parent, NannyChild, Child } = require("../models");

class NannyController {
  static getAllNannies(req, res, next) {
    Nanny.findAll({
      attributes: [
        "id",
        "name",
        "gender",
        "phoneNumber",
        "birthDate",
        "address",
        "imageUrl",
        "city",
        "expectedSalary",
        "availability",
        "ParentId",
        "AgencyId",
      ],
      where: { availability: true },
    })
      .then((nannies) => {
        res.status(200).json(nannies);
      })
      .catch((err) => {
        next(err);
      });
  }

  static registerNanny(req, res, next) {
    const {
      name,
      gender,
      phoneNumber,
      birthDate,
      address,
      imageUrl,
      city,
      expectedSalary,
    } = req.body;

    Nanny.create({
      name,
      gender,
      phoneNumber,
      birthDate,
      address,
      imageUrl,
      city,
      expectedSalary,
    })
      .then((nanny) => {
        res.status(201).json(nanny);
      })
      .catch((err) => {
        next(err);
      });
  }

  static addNanny(req, res, next) {
    const {
      name,
      gender,
      phoneNumber,
      birthDate,
      address,
      imageUrl,
      city,
      expectedSalary,
    } = req.body;
    const AgencyId = req.agencyData.id;

    Nanny.create({
      name,
      gender,
      phoneNumber,
      birthDate,
      address,
      imageUrl,
      city,
      expectedSalary,
      AgencyId,
    })
      .then((nanny) => {
        res.status(201).json(nanny);
      })
      .catch((err) => {
        next(err);
      });
  }

  static getNannyById(req, res, next) {
    const { id } = req.params;
    Nanny.findOne({
      where: { id },
      include: [{ model: Agency, attributes: ["id", "name"] }],
    })
      .then((nanny) => {
        if (!nanny) {
          next({ name: "ERR_NOT_FOUND" });
        } else {
          res.status(200).json(nanny);
        }
      })
      .catch((err) => {
        next(err);
      });
  }

  static updateDataNanny(req, res, next) {
    const {
      name,
      gender,
      phoneNumber,
      birthDate,
      address,
      imageUrl,
      city,
      expectedSalary,
    } = req.body;
    const { id } = req.params;
    Nanny.findOne({ where: { id } })
      .then((nanny) => {
        if (!nanny) {
          throw next({ name: "ERR_NOT_FOUND" });
        } else {
          return Nanny.update(
            {
              name,
              gender,
              phoneNumber,
              birthDate,
              address,
              imageUrl,
              city,
              expectedSalary,
            },
            { where: { id } }
          );
        }
      })
      .then((resp) => {
        if (resp[0] === 1) {
          res.status(200).json({ message: "Successfully updated" });
        } else {
          next({ name: "ERR_NOT_FOUND" });
        }
      })
      .catch((err) => {
        next(err);
      });
  }

  static deleteById(req, res, next) {
    const { id } = req.params;
    Nanny.findOne({ where: { id } })
      .then((nanny) => {
        if (!nanny) {
          throw next({ name: "ERR_NOT_FOUND" });
        } else {
          return Nanny.destroy({ where: { id } });
        }
      })
      .then((resp) => {
        if (resp === 1) {
          res.status(200).json({ message: "Successfully deleted" });
        } else {
          next(err);
        }
      })
      .catch((err) => {
        next(err);
      });
  }

  static addToWishList(req, res, next) {
    const id = req.params.nannyId;
    const ParentId = req.parentData.id;
    Nanny.update({ ParentId }, { where: { id } })
      .then((resp) => {
        if (resp[0] === 1) {
          res.status(200).json({ message: "Successfully added to wishlist" });
        } else {
          next({ name: "ERR_NOT_FOUND" });
        }
      })
      .catch((err) => {
        next(err);
      });
  }

  static getAllWishlist(req, res, next) {
    const ParentId = req.parentData.id;
    Nanny.findAll({ where: { ParentId, availability: true } })
      .then((nannies) => {
        res.status(200).json(nannies);
      })
      .catch((err) => {
        console.log(err);
        next(err);
      });
  }

  static updateAvailStatusNanny(req, res, next) {
    const { id } = req.params;
    Nanny.update({ availability: false }, { where: { id } })
      .then((resp) => {
        if (resp[0] === 1) {
          res.status(200).json({ message: "Updated nanny status success" });
        } else {
          next({ name: "ERR_NOT_FOUND" });
        }
      })
      .catch((err) => {
        next(err);
      });
  }

  static removeWishList(req, res, next) {
    const id = req.params.nannyId;
    Nanny.update({ ParentId: null }, { where: { id } })
      .then((resp) => {
        if (resp[0] === 1) {
          res
            .status(200)
            .json({ message: "Successfully remove from wishlist parent" });
        } else {
          next({ name: "ERR_NOT_FOUND" });
        }
      })
      .catch((err) => {
        next(err);
      });
  }

  static findAllCorrespondingNanny(req, res, next) {
    const AgencyId = req.agencyData.id;
    Nanny.findAll({
      where: { AgencyId },
      attributes: [
        "id",
        "name",
        "gender",
        "phoneNumber",
        "birthDate",
        "address",
        "imageUrl",
        "city",
        "expectedSalary",
        "availability",
        "ParentId",
        "AgencyId",
      ],
    })
      .then((nannies) => {
        res.status(200).json(nannies);
      })
      .catch((err) => {
        next(err);
      });
  }
  static getAllNanniesToTheRight(req, res, next) {
    let nannyId = req.params.id;
    let tempNanny = [];
    Nanny.findAll({
      attributes: [
        "id",
        "name",
        "gender",
        "phoneNumber",
        "birthDate",
        "address",
        "imageUrl",
        "city",
        "expectedSalary",
        "availability",
        "ParentId",
        "AgencyId",
      ],
      where: { availability: true },
    }).then((data) => {
      // let nanny = data
      let nannyFilter = data.find((nanny) => {
        return nanny.id == nannyId;
      });
      if (!nannyFilter) {
        let getAllNannyWithBigId = data.filter((nanny) => {
          return nanny.id > nannyId;
        });

        if (getAllNannyWithBigId.length == 0) {
          console.log("masuk pak ekooooo");
          let nannyToSend = data[0];
          res.status(200).json({
            nanny: nannyToSend,
            palingGede: true,
          });
        } else {
          res.status(200).json({
            nanny: getAllNannyWithBigId[0],
            palingGede: false,
          });
        }
      } else {
        res.status(200).json({
          nanny: nannyFilter,
          palingGede: false,
        });
      }
    });
  }

  static getAllNanniesToTheLeft(req, res, next) {
    let nannyId = req.params.id;
    let tempNanny = [];
    Nanny.findAll({
      attributes: [
        "id",
        "name",
        "gender",
        "phoneNumber",
        "birthDate",
        "address",
        "imageUrl",
        "city",
        "expectedSalary",
        "availability",
        "ParentId",
        "AgencyId",
      ],
      where: { availability: true },
    }).then((data) => {
      // let nanny = data
      let nannyFilter = data.find((nanny) => {
        return nanny.id == nannyId;
      });
      if (!nannyFilter) {
        let getAllNannyWithBigId = data.filter((nanny) => {
          return nanny.id < nannyId;
        });
        console.log(getAllNannyWithBigId);
        if (getAllNannyWithBigId.length == 0) {
          let nannyToSend = data[data.length - 1];
          res.status(200).json({
            nanny: nannyToSend,
            palingKecil: true,
          });
        } else {
          res.status(200).json({
            nanny: getAllNannyWithBigId[getAllNannyWithBigId.length - 1],
            palingKecil: false,
          });
        }
      } else {
        res.status(200).json({
          nanny: nannyFilter,
          palingKecil: false,
        });
      }
    });
  }
}

module.exports = NannyController;
