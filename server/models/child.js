"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Child extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Child.belongsTo(models.Parent);
      Child.belongsToMany(models.Nanny, { through: models.NannyChild });
    }
  }
  Child.init(
    {
      name: DataTypes.STRING,
      birthDate: DataTypes.DATE,
      condition: DataTypes.STRING,
      gender: DataTypes.STRING,
      ParentId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Child",
    }
  );
  return Child;
};
