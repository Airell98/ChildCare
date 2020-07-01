"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert(
      "Parents",
      [
        {
          name: "Fadhlan",
          email: "fadhlan@outlook.co.id",
          password: "rahasia",
          birthDate: new Date(1995, 7, 11),
          phoneNumber: "081212498600",
          address: "Bumi Mas Raya Blok B4 Nomor 2",
          city: "Tangerang",
          gender: "male",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Parents", null, {});
  },
};
