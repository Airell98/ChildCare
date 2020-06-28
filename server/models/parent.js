"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  const bcryptHashPass = require("../helper/hashPass");
  class Parent extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Parent.hasMany(models.Child);
      Parent.hasMany(models.Nanny);
      Parent.belongsToMany(models.Agency, { through: models.Nanny });
      Parent.belongsToMany(models.Agency, { through: models.Message });
    }
  }
  Parent.init(
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      birthDate: DataTypes.DATE,
      phoneNumber: DataTypes.STRING,
      address: DataTypes.STRING,
      city: DataTypes.STRING,
      gender: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Parent",
    }
  );
  Parent.beforeCreate((instance, option) => {
    const hash = bcryptHashPass(instance);
    instance.password = hash;
  });
  return Parent;
};
