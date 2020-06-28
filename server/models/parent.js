"use strict";
const { Model } = require("sequelize");
const hashPass = require("../helper/hashPass");

module.exports = (sequelize, DataTypes) => {
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
    }
  }
  Parent.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "name field is not found",
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
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notNull: {
            msg: "email field is not found",
          },
          notEmpty: {
            args: true,
            msg: "Please insert email",
          },
          isEmail: {
            args: true,
            msg: "Please insert the correct email",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "password field is not found",
          },
          notEmpty: {
            args: true,
            msg: "Please insert password",
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
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "phoneNumber field is not found",
          },
          notEmpty: {
            args: true,
            msg: "Please insert phone number",
          },
          len: {
            args: [10, 14],
            msg: "Please insert the correct phone number",
          },
        },
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "address field is not found",
          },
          notEmpty: {
            args: true,
            msg: "Please insert address",
          },
        },
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "city field is not found",
          },
          notEmpty: {
            args: true,
            msg: "Please insert city",
          },
        },
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
    },
    {
      sequelize,
      modelName: "Parent",
    }
  );

  Parent.beforeCreate((instance, option) => {
    const hash = hashPass(instance);
    console.log(hash);
    instance.password = hash;
  });
  return Parent;
};
