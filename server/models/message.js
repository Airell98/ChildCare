"use strict";
const { Model } = require("sequelize");
const { Sequelize } = require(".");
module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Message.belongsTo(models.Parent);
      Message.belongsTo(models.Agency);
      // define association here
    }
  }
  Message.init(
    {
      content: DataTypes.STRING,
      ParentId: DataTypes.INTEGER,
      AgencyId: DataTypes.INTEGER,
      readParent: DataTypes.BOOLEAN,
      readAgency: DataTypes.BOOLEAN,
      sender: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Message",
    }
  );
  Message.beforeCreate((instance, options) => {
    if (!instance.readParent) {
      instance.readParent = false;
    }
    if (!instance.readAgency) {
      instance.readAgency = false;
    }
  });
  return Message;
};
