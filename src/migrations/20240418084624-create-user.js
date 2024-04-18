"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userName: {
        type: Sequelize.STRING,
      },
      password: {
        type: Sequelize.STRING,
      },
      isLoginGoogle: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      displayName: {
        type: Sequilize.STRING,
      },
      isDelete: {
        type: Sequilize.BOOLEAN,
      },

      image: {
        type: Sequelize.STRING,
        defaultValue: "",
      },
      roleId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Roles",
          key: "id",
        },
        allowNull: false,
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Users");
  },
};
