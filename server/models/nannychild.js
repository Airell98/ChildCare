'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class NannyChild extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
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