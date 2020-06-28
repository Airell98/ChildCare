"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  const bcryptHashPass = require("../helper/hashPass");
  class Agency extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Agency.hasMany(models.Nanny);
      Agency.belongsToMany(models.Parent, { through: models.Nanny });
      Agency.belongsToMany(models.Parent, { through: models.Message });
    }
  }
  Agency.init(
    {
      name: DataTypes.STRING,
      logoUrl: DataTypes.STRING,
      phoneNumber: DataTypes.STRING,
      address: DataTypes.STRING,
      city: DataTypes.STRING,
      password: DataTypes.STRING,
      email: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Agency",
    }
  );
  Agency.beforeCreate((instance, option) => {
    const hash = bcryptHashPass(instance);
    instance.password = hash;
  });
  return Agency;
};
