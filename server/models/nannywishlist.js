"use strict";
module.exports = (sequelize, DataTypes) => {
  const NannyWishlist = sequelize.define(
    "NannyWishlist",
    {
      name: DataTypes.STRING,
      imageUrl: DataTypes.STRING,
      birthDate: DataTypes.DATE,
      phoneNumber: DataTypes.STRING,
      address: DataTypes.STRING,
      city: DataTypes.STRING,
      gender: DataTypes.STRING,
      expectedSalary: DataTypes.INTEGER,
      AgencyId: DataTypes.INTEGER,
      ParentId: DataTypes.INTEGER,
      availability: DataTypes.BOOLEAN,
    },
    {}
  );
  NannyWishlist.associate = function (models) {
    NannyWishlist.belongsTo(models.Agency);
  };
  return NannyWishlist;
};
