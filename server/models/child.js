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
      // define association here
      Child.belongsTo(models.Parent);
      Child.belongsToMany(models.Nanny, { through: models.NannyChild });
    }
  }
  Child.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Name field is not found",
          },
          notEmpty: {
            args: true,
            msg: "Please insert name",
          },
          len: {
            args: [1, 30],
            msg: "Please insert name with maximum of 30 characters",
          },
        },
      },
      birthDate: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          notNull: {
            msg: "birthDate field is not found",
          },
          notEmpty: {
            args: true,
            msg: "Please insert birth date",
          },
          isDate: {
            args: true,
            msg: "Invalid date format",
          },
        },
      },
      condition: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      gender: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "gender field is not found",
          },
          notEmpty: {
            args: true,
            msg: "Please insert gender",
          },
          isIn: {
            args: [["male", "female"]],
            msg: "Must be male or female",
          },
        },
      },
      ParentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "ParentId field is not found",
          },
          notEmpty: {
            args: true,
            msg: "ParentId is empty",
          },
          isInt: {
            args: true,
            msg: "Invalid ParentId",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Child",
    }
  );
  return Child;
};
