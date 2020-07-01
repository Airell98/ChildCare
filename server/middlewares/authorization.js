const { Child, Nanny, Parent } = require("../models");

const authorizationUpdateParent = (req, res, next) => {
  if (!req.parentData.id || req.params.id != req.parentData.id) {
    next({ name: "AUTHORIZATION_FAILED" });
  }
};

const authorizationParent = (req, res, next) => {
  const { id } = req.params;

  Child.findOne({ where: { id }, attributes: ["ParentId"] })
    .then((resp) => {
      if (resp.dataValues.ParentId != req.parentData.id) {
        next({ name: "AUTHORIZATION_FAILED" });
      } else {
        next();
      }
    })
    .catch((err) => {
      {
        next(err);
      }
    });
};

const authorizationAgency = (req, res, next) => {
  const { id } = req.params;

  Nanny.findOne({ where: { id }, attributes: ["AgencyId"] })
    .then((resp) => {
      if (resp.dataValues.AgencyId != req.agencyData.id) {
        next({ name: "AUTHORIZATION_FAILED" });
      } else {
        next();
      }
    })
    .catch((err) => {
      {
        next(err);
      }
    });
};

module.exports = {
  authorizationUpdateParent,
  authorizationParent,
  authorizationAgency,
};
