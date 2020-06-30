const { Message, Agency, Parent } = require("../models");
class MessageController {
  static getAllMsgAgency(req, res, next) {
    const AgencyId = req.agencyData.id;
    Message.findAll({
      where: { AgencyId, sender: "parent" },
      order: [
        ["ParentId", "ASC"],
        ["id", "ASC"],
      ],
      include: [
        { model: Agency, attributes: ["id", "email"] },
        { model: Parent, attributes: ["id", "email", "name"] },
      ],
    })
      .then((messages) => {
        let filterMsgArray = [];
        let countUnread = 0;
        for (let i = 0; i < messages.length; i++) {
          if (!messages[i].dataValues.readAgency) {
            countUnread++;
          }
          if (
            i === messages.length - 1 ||
            messages[i].ParentId !== messages[i + 1].ParentId
          ) {
            let tempCount = countUnread;
            filterMsgArray.push({
              ...messages[i].dataValues,
              unread: tempCount,
            });
            countUnread = 0;
          }
        }
        filterMsgArray.sort(function (a, b) {
          return new Date(b.createdAt - a.createdAt);
        });
        res.status(200).json(filterMsgArray);
      })
      .catch((err) => {
        next(err);
      });
  }
  static getAllMsgParent(req, res, next) {
    const ParentId = req.parentData.id;
    Message.findAll({
      where: { ParentId, sender: "agency" },
      order: [
        ["AgencyId", "DESC"],
        ["id", "ASC"],
      ],
      include: [
        { model: Agency, attributes: ["id", "email", "name"] },
        { model: Parent, attributes: ["id", "email"] },
      ],
    })
      .then((messages) => {
        let filterMsgArray = [];
        let countUnread = 0;
        for (let i = 0; i < messages.length; i++) {
          console.log(messages[i].dataValues.content);
          if (!messages[i].dataValues.readParent) {
            countUnread++;
          }
          if (
            i === messages.length - 1 ||
            messages[i].AgencyId !== messages[i + 1].AgencyId
          ) {
            let tempCount = countUnread;
            filterMsgArray.push({
              ...messages[i].dataValues,
              unread: tempCount,
            });
            countUnread = 0;
          }
        }
        filterMsgArray.sort(function (a, b) {
          return new Date(b.createdAt - a.createdAt);
        });
        res.status(200).json(filterMsgArray);
      })
      .catch((err) => {
        next(err);
      });
  }
  static getMsgAgency(req, res, next) {
    const AgencyId = req.agencyData.id;
    const { ParentId } = req.params;
    Message.findAll({
      where: { AgencyId, ParentId },
      include: { model: Parent, attributes: ["email"] },
      order: [["createdAt", "ASC"]],
    })
      .then((messages) => {
        res.status(200).json(messages);
      })
      .catch((err) => {
        next(err);
      });
  }
  static getMsgParent(req, res, next) {
    const ParentId = req.parentData.id;
    const { AgencyId } = req.params;
    Message.findAll({
      where: { AgencyId, ParentId },
      include: { model: Agency, attributes: ["email"] },
      order: [["createdAt", "ASC"]],
    })
      .then((messages) => {
        res.status(200).json(messages);
      })
      .catch((err) => {
        next(err);
      });
  }
  static postMsgAgency(req, res, next) {
    const AgencyId = req.agencyData.id;
    const { ParentId } = req.params;
    const { content, sender } = req.body;
    Message.create({ AgencyId, ParentId, content, sender })
      .then((message) => {
        res.status(201).json(message);
      })
      .catch((err) => {
        next(err);
      });
  }
  static postMsgParent(req, res, next) {
    const ParentId = req.parentData.id;
    const { AgencyId } = req.params;
    const { content, sender } = req.body;
    Message.create({ AgencyId, ParentId, content, sender })
      .then((message) => {
        res.status(201).json(message);
      })
      .catch((err) => {
        next(err);
      });
  }
  static updateAllMsgParent(req, res, next) {
    const ParentId = req.parentData.id;
    const { AgencyId } = req.params;
    Message.update({ readParent: true }, { where: { ParentId, AgencyId } })
      .then(() => {
        res.status(200).json({ message: "Successfully updated read data" });
      })
      .catch((err) => {
        next(err);
      });
  }
  static updateAllMsgAgency(req, res, next) {
    const AgencyId = req.agencyData.id;
    const { ParentId } = req.params;
    Message.update({ readAgency: true }, { where: { ParentId, AgencyId } })
      .then(() => {
        res.status(200).json({ message: "Successfully updated read data" });
      })
      .catch((err) => {
        next(err);
      });
  }
}
module.exports = MessageController;
