"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Nanny extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Nanny.belongsTo(models.Parent);
      Nanny.belongsTo(models.Agency);
      Nanny.belongsToMany(models.Child, { through: models.NannyChild });
      Nanny.belongsTo(models.Parent, {
        sourceKey: "id",
        foreignKey: "ParentId",
      });
      Nanny.belongsTo(models.Agency, {
        sourceKey: "id",
        foreignKey: "AgencyId",
      });
    }
  }
  Nanny.init(
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
      imageUrl: {
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
      expectedSalary: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "expectedSalary field is not found",
          },
          notEmpty: {
            args: true,
            msg: "Please insert expected salary",
          },
          isInt: {
            args: true,
            msg: "Invalid salary",
          },
        },
      },
      AgencyId: {
        type: DataTypes.INTEGER,
      },
      ParentId: {
        type: DataTypes.INTEGER,
        validate: {
          isInt: {
            args: true,
            msg: "Invalid ParentId",
          },
        },
      },
      availability: DataTypes.BOOLEAN
    },
    {
      sequelize,
      modelName: "Nanny",
    }
  );

  Nanny.beforeCreate((instance, options) => {
    if(!instance.AgencyId){
      instance.AgencyId = 1
    }
    if(!instance.availability){
      instance.availability = true
    }
  })
  return Nanny;
};
