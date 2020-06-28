const { Nanny, Child, Agency, Parent } = require("../models");
const compareSyncBcrypt = require("../helper/compareSyncBcyrpt");
const jwtVerify = require("../helper/jwtVerify");
const app = require("express")();
const http = require("http").Server(app);
const io = require("socket.io")(http);

class ParentController {
  static registerParent(req, res, next) {
    const {
      name,
      email,
      password,
      city,
      birthDate,
      address,
      phoneNumber,
      gender,
    } = req.body;
    Parent.create({
      name,
      email,
      password,
      city,
      birthDate,
      address,
      phoneNumber,
      gender,
    })
      .then((parent) => {
        res.status(201).json(parent);
      })
      .catch((err) => {
        next(err);
      });
  }

  static loginParent(req, res, next) {
    const { email, password } = req.body;
    Parent.findOne({
      where: {
        email,
      },
    })
      .then((parent) => {
        if (!parent || !compareSyncBcrypt(password, parent.password)) {
          next({ name: "Login Error" });
        } else {
          const token = jwtVerify(parent);
          res.status(200).json({
            access_token: token,
            email: parent.email,
            name: parent.name,
          });
        }
      })
      .catch((er) => {
        next(err);
      });
  }

  static chat(req, res, next) {
    io.on("connection", (socket) => {
      socket.on("sendMessage", (msg) => {
        console.log(msg);
      });
    });
  }
}

module.exports = ParentController;
