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
      logoUrl: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "imageUrl field is not found",
          },
          notEmpty: {
            args: true,
            msg: "Please insert image",
          },
          isUrl: {
            args: true,
            msg: "Invalid image url",
          },
          len: {
            args: [1, 255],
            msg: "Image url is too long. Maximum 255 chars",
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
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Password field is not found",
          },
          notEmpty: {
            args: true,
            msg: "Please insert password",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notNull: {
            msg: "Email field is not found",
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
