'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const { Sequelize } = sequelize
  const { Model } = Sequelize
  class NannyChild extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      NannyChild.belongsTo(models.Child, { sourceKey: 'id', foreignKey: "ChildId" })
      NannyChild.belongsTo(models.Nanny, { sourceKey: 'id', foreignKey: "NannyId" })

      // define association here
    }
  };
  NannyChild.init({
    NannyId: DataTypes.INTEGER,
    ChildId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'NannyChild',
  });
  return NannyChild;
};