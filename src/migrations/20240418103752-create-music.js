'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('Music', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      videoId: {
        type: DataTypes.STRING
      },
      channelId: {
        type: DataTypes.STRING
      },
      title: {
        type: DataTypes.STRING
      },
      thumbnails: {
        type: DataTypes.STRING
      },
      channelTitle: {
        type: DataTypes.STRING
      },
      isDelete: {
        type: DataTypes.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    });
  },
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable('Music');
  }
};