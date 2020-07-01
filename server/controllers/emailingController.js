const { Parent, Agency, Nanny } = require("../models");
const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");

class EmailingController {
  static sendHiringNannyProposal(req, res, next) {
    console.log("masuk controller");
    let parentId,
      parentAddress,
      parentCity,
      parentEmail,
      parentName,
      parentPhoneNumber,
      parentGender,
      nannyId,
      nannyBirthDate,
      nannyGender,
      nannyImageUrl,
      nannyName;

    Parent.findOne({ where: { id: req.parentData.id } })
      .then((parent) => {
        parentId = parent.dataValues.id;
        parentCity = parent.dataValues.city;
        parentEmail = parent.dataValues.email;
        parentName = parent.dataValues.name;
        parentGender = parent.dataValues.gender;
        parentPhoneNumber = parent.dataValues.phoneNumber;

        return Nanny.findOne({
          where: { id: req.params.nannyId },
          include: [{ model: Agency, attributes: ["id", "name", "email"] }],
        });
      })
      .then((nanny) => {
        nannyId = req.params.nannyId;
        nannyBirthDate = nanny.dataValues.birthDate;
        nannyGender = nanny.dataValues.gender;
        nannyImageUrl = nanny.dataValues.imageUrl;
        nannyName = nanny.dataValues.name;
        let agencyEmail = nanny.dataValues.Agency.dataValues.email;
        console.log(agencyEmail);
        var transport = nodemailer.createTransport({
          service: "Gmail",
          auth: {
            user: "supernanny.business@gmail.com",
            pass: "hacktiv8",
          },
        });

        transport.use(
          "compile",
          hbs({
            viewEngine: {
              extname: ".hbs", // handlebars extension
              partialsDir: "../server/templates/",
              layoutsDir: "../server/templates/",
              defaultLayout: "proposal",
            },
            viewPath: "../server/templates/",
            extName: ".hbs",
          })
        );

        const monthNames = [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ];

        var mailOptions = {
          from: "supernanny.business@gmail.com",
          to: agencyEmail,
          subject: "Super Nanny - Someone wants to hire your nanny!",
          template: `proposal`,
          context: {
            parentId,
            parentAddress,
            parentCity,
            parentEmail,
            parentName,
            parentPhoneNumber,
            parentGender,
            nannyId,
            nannyBirthDate,
            nannyDate: nannyBirthDate.getDate(),
            nannyMonth: monthNames[nannyBirthDate.getMonth()],
            nannyYear: nannyBirthDate.getYear(),
            nannyGender,
            nannyImageUrl,
            nannyName,
          },
        };

        transport.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.log("transport================>", error);
            next(error);
          } else {
            console.log("Email sent: " + info.response);
            res.status(200).json("email sent");
          }
        });
      })
      .catch((err) => {
        console.log("catch======================>", err);
        next(err);
      });
  }

  static agencyAcceptProposal(req, res, next) {
    console.log("accept", req.body);
    const { nannyId, agencyId, parentId } = req.body;
    let agencyName,
      agencyEmail,
      agencyAddress,
      agencyCity,
      agencyLogoUrl,
      agencyPhoneNumber,
      nannyBirthDate,
      nannyGender,
      nannyImageUrl,
      nannyName,
      parentEmail;

    Parent.findOne({
      where: { id: parentId },
    })
      .then((parent) => {
        parentEmail = parent.dataValues.email;
      })
      .catch((err) => {
        console.log(err);
        next(err);
      });

    Nanny.update(
      { ParentId: parentId, availability: false },
      {
        where: {
          id: nannyId,
        },
      }
    ).catch((err) => {
      console.log(err);
      next(err);
    });

    Nanny.findOne({
      where: { id: nannyId },
      include: [
        {
          model: Agency,
          attributes: [
            "address",
            "name",
            "email",
            "city",
            "logoUrl",
            "phoneNumber",
          ],
        },
      ],
    })
      .then((nanny) => {
        agencyName = nanny.dataValues.Agency.dataValues.name;
        agencyEmail = nanny.dataValues.Agency.dataValues.email;
        agencyAddress = nanny.dataValues.Agency.dataValues.address;
        agencyCity = nanny.dataValues.Agency.dataValues.city;
        agencyLogoUrl = nanny.dataValues.Agency.dataValues.logoUrl;
        agencyPhoneNumber = nanny.dataValues.Agency.dataValues.phoneNumber;
        nannyBirthDate = nanny.dataValues.birthDate;
        nannyGender = nanny.dataValues.gender;
        nannyImageUrl = nanny.dataValues.imageUrl;
        nannyName = nanny.dataValues.name;

        var transport = nodemailer.createTransport({
          service: "Gmail",
          auth: {
            user: "supernanny.business@gmail.com",
            pass: "hacktiv8",
          },
        });

        transport.use(
          "compile",
          hbs({
            viewEngine: {
              extname: ".hbs", // handlebars extension
              partialsDir: "../server/templates/",
              layoutsDir: "../server/templates/",
              defaultLayout: "acceptance",
            },
            viewPath: "../server/templates/",
            extName: ".hbs",
          })
        );

        var mailOptions = {
          from: "supernanny.business@gmail.com",
          to: parentEmail,
          subject:
            "Super Nanny - Agency has accepted your nanny hiring proposal!",
          template: `acceptance`,
          context: {
            agencyName,
            agencyEmail,
            agencyAddress,
            agencyCity,
            agencyLogoUrl,
            agencyPhoneNumber,
            nannyBirthDate,
            nannyGender,
            nannyImageUrl,
            nannyName,
          },
        };

        transport.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.log(error);
            next(error);
          } else {
            console.log("Email sent: " + info.response);
            res.status(200).json("You have accepted the proposal");
          }
        });
      })
      .catch((err) => {
        console.log(err);
        next(err);
      });
  }

  static agencyRefuseProposal(req, res, next) {
    console.log("refuse", req.body);
    const { nannyId, agencyId, parentId } = req.body;
    let agencyName,
      agencyEmail,
      agencyAddress,
      agencyCity,
      agencyLogoUrl,
      agencyPhoneNumber,
      nannyBirthDate,
      nannyGender,
      nannyImageUrl,
      nannyName,
      parentEmail;

    Parent.findOne({
      where: { id: parentId },
    })
      .then((parent) => {
        parentEmail = parent.dataValues.email;
      })
      .catch((err) => {
        console.log(err);
        next(err);
      });

    Nanny.findOne({
      where: { id: nannyId },
      include: [
        {
          model: Agency,
          attributes: [
            "address",
            "name",
            "email",
            "city",
            "logoUrl",
            "phoneNumber",
          ],
        },
      ],
    })
      .then((nanny) => {
        agencyName = nanny.dataValues.Agency.dataValues.name;
        agencyEmail = nanny.dataValues.Agency.dataValues.email;
        agencyAddress = nanny.dataValues.Agency.dataValues.address;
        agencyCity = nanny.dataValues.Agency.dataValues.city;
        agencyLogoUrl = nanny.dataValues.Agency.dataValues.logoUrl;
        agencyPhoneNumber = nanny.dataValues.Agency.dataValues.phoneNumber;
        nannyBirthDate = nanny.dataValues.birthDate;
        nannyGender = nanny.dataValues.gender;
        nannyImageUrl = nanny.dataValues.imageUrl;
        nannyName = nanny.dataValues.name;

        var transport = nodemailer.createTransport({
          service: "Gmail",
          auth: {
            user: "supernanny.business@gmail.com",
            pass: "hacktiv8",
          },
        });

        transport.use(
          "compile",
          hbs({
            viewEngine: {
              extname: ".hbs", // handlebars extension
              partialsDir: "../server/templates/",
              layoutsDir: "../server/templates/",
              defaultLayout: "refusal",
            },
            viewPath: "../server/templates/",
            extName: ".hbs",
          })
        );

        var mailOptions = {
          from: "supernanny.business@gmail.com",
          to: parentEmail,
          subject:
            "Super Nanny - Agency has refused your nanny hiring proposal",
          template: `refusal`,
          context: {
            agencyName,
            agencyEmail,
            agencyAddress,
            agencyCity,
            agencyLogoUrl,
            agencyPhoneNumber,
            nannyBirthDate,
            nannyGender,
            nannyImageUrl,
            nannyName,
          },
        };

        transport.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.log(error);
            next(error);
          } else {
            console.log("Email sent: " + info.response);
            res.status(200).json("You have refused the proposal");
          }
        });
      })
      .catch((err) => {
        console.log(err);
        next(err);
      });
  }
}

module.exports = EmailingController;
