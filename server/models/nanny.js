'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Nanny extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Nanny.belongsTo(models.Parent)
      Nanny.belongsTo(models.Agency)
      Nanny.belongsToMany(models.Child, {through: models.NannyChild})
      Nanny.belongsTo(models.Parent, { sourceKey: 'id', foreignKey: "ParentId" })
      Nanny.belongsTo(models.Agency, { sourceKey: 'id', foreignKey: "AgencyId" })
    }
  };
  Nanny.init({
    name: DataTypes.STRING,
    imageUrl: DataTypes.STRING,
    birthDate: DataTypes.DATE,
    phoneNumber: DataTypes.STRING,
    address: DataTypes.STRING,
    city: DataTypes.STRING,
    gender: DataTypes.STRING,
    expectedSalary: DataTypes.INTEGER,
    AgencyId: DataTypes.INTEGER,
    ParentId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Nanny',
  });
  return Nanny;
};