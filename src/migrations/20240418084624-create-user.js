"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable("Users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      userName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      password: {
        type: DataTypes.STRING,
        allowNull: true
      },
      isLoginGoogle: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
      },
      displayName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      isDelete: {
        type: DataTypes.BOOLEAN,
        defaultValue: 0,
        allowNull: false
      },

      image: {
        type: DataTypes.STRING,
        defaultValue: "",
        allowNull: false
      },
      roleId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Roles",
          key: "id",
        },
        allowNull: false,
      },

      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    });
  },
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable("Users");
  },
};
