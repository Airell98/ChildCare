const { Agency } = require("../models");
const jwtSign = require("../helper/jwtSign");
const compareSyncBcrypt = require("../helper/compareSyncBcyrpt");

class AgencyController {
  static registerAgency(req, res, next) {
    const {
      name,
      email,
      password,
      address,
      city,
      logoUrl,
      phoneNumber,
    } = req.body;
    Agency.create({
      name,
      email,
      password,
      address,
      city,
      logoUrl,
      phoneNumber,
    })
      .then((agency) => {
        res.status(201).json(agency);
      })
      .catch((err) => {
        console.log(err);
        next(err);
      });
  }

  static loginAgency(req, res, next) {
    const { email, password } = req.body;
    Agency.findOne({ where: { email } })
      .then((agency) => {
        if (!agency || !compareSyncBcrypt(password, agency.password)) {
          next({ name: "INVALID_EMAIL_PASSWORD" });
        } else {
          const token = jwtSign(agency);
          res.status(200).json({
            access_token: token,
            message: "Login success",
            user: {
              name: agency.email,
              address: agency.address,
              city: agency.city,
              logoUrl: agency.logoUrl,
              phoneNumber: agency.phoneNumber,
            },
          });
        }
      })
      .catch((err) => {
        console.log(err);
        next(err);
      });
  }

  static getAllAgencies(req, res, next) {
    Agency.findAll({
      attributes: [
        "id",
        "name",
        "email",
        "password",
        "address",
        "city",
        "logoUrl",
        "phoneNumber",
      ],
    })
      .then((agencies) => {
        res.status(200).json(agencies);
      })
      .catch((err) => {
        next(err);
      });
  }

  static getAgencyById(req, res, next) {
    const { id } = req.params;
    Agency.findOne({ where: { id } })
      .then((agency) => {
        if (!agency) {
          next({ name: "ERR_NOT_FOUND" });
        } else {
          res.status(200).json(agency);
        }
      })
      .catch((err) => {
        next(err);
      });
  }

  static updateDataAgency(req, res, next) {
    const { id } = req.params;
    const {
      name,
      email,
      password,
      address,
      city,
      logoUrl,
      phoneNumber,
    } = req.body;
    Agency.findOne({ where: { id } })
      .then((agecy) => {
        if (!agecy) {
          throw next({ name: "ERR_NOT_FOUND" });
        } else {
          return Agency.update(
            { name, email, password, address, city, logoUrl, phoneNumber },
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
    Agency.findOne({ where: { id } })
      .then((agecy) => {
        if (!agecy) {
          throw next({ name: "ERR_NOT_FOUND" });
        } else {
          return Agency.destroy({ where: { id } });
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
}

module.exports = AgencyController;
