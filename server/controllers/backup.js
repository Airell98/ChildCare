const { Parent, Agency, Nanny } = require("../models");
const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");

class EmailingController {
  static sendHiringNannyProposal(req, res, next) {
    let parentId,
      parentAddress,
      parentCity,
      parentEmail,
      parentName,
      parentPhoneNumber,
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

        var mailOptions = {
          from: "supernanny.business@gmail.com",
          to: "fadhlanfariz95@gmail.com",
          subject: "Super Nanny - Someone wants to hire your nanny!",
          template: `proposal`,
          context: {
            parentId,
            parentAddress,
            parentCity,
            parentEmail,
            parentName,
            parentPhoneNumber,
            nannyId,
            nannyBirthDate,
            nannyGender,
            nannyImageUrl,
            nannyName,
            agencyId: req.agencyData.id,
          },
        };

        transport.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.log(error);
            next(error);
          } else {
            console.log("Email sent: " + info.response);
            res.status(200).json("email sent");
          }
        });
      })
      .catch((err) => {
        next(err);
      });
  }

  static agencyAcceptProposal(req, res, next) {
    console.log("accept", req.body);
  }

  static agencyRefuseProposal(req, res, next) {
    console.log("refuse", req.body);
    const { nannyId, agencyId } = req.body;
    let agencyName,
      agencyEmail,
      agencyAddress,
      agencyCity,
      agencyLogoUrl,
      agencyPhoneNumber,
      nannyBirthDate,
      nannyGender,
      nannyImageUrl,
      nannyName;

    Nanny.findOne({
      where: { id: nannyId },
      include: [{ model: Agency }],
    })
      .then((nanny) => {
        console.log(nanny);
        agencyName = nanny.dataValues.agency.dataValues.name;
        agencyEmail = nanny.dataValues.agency.dataValues.email;
        agencyAddress = nanny.dataValues.agency.dataValues.address;
        agencyCity = nanny.dataValues.agency.dataValues.city;
        agencyLogoUrl = nanny.dataValues.agency.dataValues.phoneNumber;
        agencyPhoneNumber = nanny.dataValues.agency.dataValues.logoUrl;
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
          to: "fadhlan@outlook.co.id",
          subject: "Super Nanny - Someone wants to hire your nanny!",
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
            res.status(200).json("email sent");
          }
        });
      })
      .catch((err) => {
        next(err);
      });
  }
}

module.exports = EmailingController;
